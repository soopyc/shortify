import pg from "pg";
import * as schema from "$lib/db/schema";
import { DATABASE_URL } from "$env/static/private";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate as _migrate } from "drizzle-orm/node-postgres/migrator";
import { getLogger } from "./logging";

const logger = getLogger("db");
const drizzleLogger = getLogger("db:drizzle");
const { Pool } = pg;

const pool = new Pool({
	connectionString: DATABASE_URL,
	max: 20,
	log: (msg) => { drizzleLogger.trace(msg); },
});

export const db = drizzle(pool, { schema });

export async function migrate() {
	logger.info("migrating database...");
	try {
		// XXX: this might become a problem with nix
		await _migrate(db, { migrationsFolder: "./src/lib/db/drizzle" });
	} catch (e) {
		if (e instanceof Error) {
			logger.fatal("migration failed. please see the below stacktrace for details.");
		} else {
			logger.fatal("unknown error (? - error is of unknown type).");
		}
		throw e;
	}
	logger.info("migrations completed.");
}
