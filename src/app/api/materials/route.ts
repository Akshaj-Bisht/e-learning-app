import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { studyMaterials } from "@/db/schema";

// Create a new Hono app
const app = new Hono().get("/", async (c) => {
	try {
		// Fetch materials from the database
		const materials = await db.query.studyMaterials.findMany({
			where: eq(studyMaterials.isApproved, true),
			with: {
				user: true,
			},
			orderBy: desc(studyMaterials.createdAt),
		});

		return c.json({ success: true, materials });
	} catch (error) {
		console.error("Error fetching materials:", error);
		return c.json({ error: "Internal Server Error" }, 500);
	}
});

// Export the handle function for Next.js to use
export const GET = handle(app);
