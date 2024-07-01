import 'dotenv/config'
import { defineConfig } from "drizzle-kit";

// preflight checks
if (!process.env.DATABASE_URL || process.env.DATABASE_URL == "") {
	throw new Error("environment variable DATABASE_URL cannot be empty or undefined. check if you have a .env file copied.")
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/lib/db/schema.ts",
	out: "./src/lib/db/drizzle",
	dbCredentials: {url: process.env.DATABASE_URL},
})
