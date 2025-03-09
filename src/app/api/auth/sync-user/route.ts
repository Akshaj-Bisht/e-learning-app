import { Hono } from "hono";
import { handle } from "hono/vercel";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Create a new Hono app
const app = new Hono().post("/", async (c) => {
	try {
		console.log("Sync-user API called");

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

		// If user already exists, return success
		if (existingUser) {
			return c.json({
				success: true,
				user: existingUser,
				message: "User already exists",
			});
		}

		console.log("Creating new user in database");
		// Create user in our database
		const newUser = await db
			.insert(users)
			.values({
				id: userId,
				email: user.emailAddresses[0].emailAddress,
				name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
				imageUrl: user.imageUrl,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		console.log("New user created:", newUser[0].id);
		return c.json({ success: true, user: newUser[0], message: "User created" });
	} catch (error) {
		console.error("Error syncing user to database:", error);
		// Return more detailed error information for debugging
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
