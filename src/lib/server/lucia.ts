import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./database";
import { session, user } from "$lib/db/schema";
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import { GitHub } from "arctic";

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia,
		DatabaseUserAttributes: {
			github_id: number,
			username: string,
		}
	}
}

export const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		},
	},
	getUserAttributes: (attributes) => {
		return {
			githubId: attributes.github_id,
			username: attributes.username
		}
	}
})

// setting redirect_uri doesn't seem to be needed, we won't be doing that then.
// technically doable by adding the base endpoint with "/auth/github/callback".
export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)
