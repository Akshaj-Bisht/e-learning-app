import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not set");
}

// Initialize the Neon client with SSL
const sql = neon(process.env.DATABASE_URL);

// Initialize the Drizzle client with the schema
export const db = drizzle(sql, { schema });

// Export all tables and relations
export * from "./schema";
