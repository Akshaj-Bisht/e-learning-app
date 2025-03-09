import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { zValidator } from "@hono/zod-validator";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/db";

// Create a new Hono app
const app = new Hono().use(logger()).use(secureHeaders()).use(cors());

// Public routes
const publicRoutes = app.basePath("/public");

// Protected routes with Clerk authentication
const api = app.basePath("/api");

// Study Materials API
const materialsApi = api.basePath("/materials");

// Get all study materials
materialsApi.get("/", async (c) => {
	const session = await auth();
	const userId = session.userId;

	if (!userId) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	try {
		const materials = await db.query.studyMaterials.findMany({
			where: (materials, { eq }) => eq(materials.isApproved, true),
			with: {
				user: true,
				likes: true,
			},
		});

		return c.json({ materials });
	} catch (error) {
		console.error("Error fetching materials:", error);
		return c.json({ error: "Failed to fetch materials" }, 500);
	}
});

// Study Groups API
const groupsApi = api.basePath("/groups");

// Get all study groups
groupsApi.get("/", async (c) => {
	const session = await auth();
	const userId = session.userId;

	if (!userId) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	try {
		const groups = await db.query.studyGroups.findMany({
			where: (groups, { eq }) => eq(groups.isPublic, true),
			with: {
				creator: true,
				members: true,
			},
		});

		return c.json({ groups });
	} catch (error) {
		console.error("Error fetching groups:", error);
		return c.json({ error: "Failed to fetch groups" }, 500);
	}
});

// Export the Hono app with Vercel adapter
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
