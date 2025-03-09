import { Hono } from "hono";
import { handle } from "hono/vercel";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { studyMaterials, users } from "@/db/schema";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";

// Create a new Hono app
const app = new Hono().post("/", async (c) => {
	try {
		console.log("Upload API called");

		const user = await currentUser();
		console.log("Current user from Clerk:", user ? "Found" : "Not found");

		if (!user || !user.id) {
			console.error("Auth failed: User not found or no user ID");
			return c.json(
				{ error: "Unauthorized", details: "No authenticated user found" },
				401
			);
		}

		const userId = user.id;
		console.log("User ID:", userId);

		// Check if user exists in our database
		const existingUser = await db.query.users.findFirst({
			where: eq(users.id, userId),
		});

		console.log(
			"Existing user in database:",
			existingUser ? "Found" : "Not found"
		);

		// If user doesn't exist, sync them first
		if (!existingUser) {
			console.log("Syncing user to database");
			try {
				const req = c.req.raw;
				const syncResponse = await fetch(
					new URL("/api/auth/sync-user", req.url),
					{
						method: "POST",
					}
				);

				console.log("Sync response status:", syncResponse.status);

				if (!syncResponse.ok) {
					return c.json(
						{
							error: "Failed to sync user",
							status: syncResponse.status,
							statusText: syncResponse.statusText,
						},
						500
					);
				}
			} catch (error) {
				console.error("Error syncing user:", error);
				return c.json(
					{
						error: "Failed to sync user",
						details: error instanceof Error ? error.message : "Unknown error",
					},
					500
				);
			}
		}

		// Get form data
		console.log("Processing form data");
		const formData = await c.req.formData();
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const type = formData.get("type") as string;
		const subject = formData.get("subject") as string;
		const course = formData.get("course") as string;
		const year = formData.get("year")
			? parseInt(formData.get("year") as string)
			: null;
		const semester = formData.get("semester")
			? parseInt(formData.get("semester") as string)
			: null;
		const file = formData.get("file") as File | null;
		const youtubeUrl = formData.get("youtubeUrl") as string | null;

		console.log("Form data received:", {
			title,
			type,
			subject,
			course,
			hasFile: !!file,
		});

		if (!title || !description || !type || !subject || !course) {
			console.error("Missing required fields");
			return c.json({ error: "Missing required fields" }, 400);
		}

		let fileUrl = null;
		if (file) {
			console.log("Uploading file:", file.name);
			// Upload file to Vercel Blob
			const blob = await put(file.name, file, {
				access: "public",
			});
			fileUrl = blob.url;
			console.log("File uploaded, URL:", fileUrl);
		}

		// Create study material in database
		console.log("Creating study material in database");
		const material = await db
			.insert(studyMaterials)
			.values({
				title,
				description,
				type,
				subject,
				course,
				year,
				semester,
				fileUrl,
				youtubeUrl,
				userId,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		console.log("Material created:", material[0].id);
		return c.json({ success: true, material: material[0] });
	} catch (error) {
		console.error("Upload error:", error);
		return c.json(
			{
				error: "Internal Server Error",
				details: error instanceof Error ? error.message : "Unknown error",
				stack: error instanceof Error ? error.stack : null,
			},
			500
		);
	}
});

// Export the handle function for Next.js to use
export const POST = handle(app);
