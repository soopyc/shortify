import { error, redirect } from "@sveltejs/kit";
import { OAuth2RequestError } from "arctic";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { user } from "$lib/db/schema.js";
import { getLogger } from "$lib/logging.js";
import { db } from "$lib/server/database.js";
import { github, lucia } from "$lib/server/lucia.js";

const logger = getLogger("github:callback");

export async function GET({ url, cookies, fetch }) {
	const uuid = randomUUID();

	// do a cleanup
	await lucia.deleteExpiredSessions();

	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("state") ?? null;

	if (!code || !state || !storedState) {
		error(400, { id: uuid, message: "missing state or code, or the stored state cookie does not exist." });
	}

	if (storedState !== state) {
		error(400, { id: uuid, message: "state does not match stored state cookie." });
	}

	try {
		// validate the authorization code and get tokens
		const tokens = await github.validateAuthorizationCode(code);

		// query github api for user data
		const data = await fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${tokens.accessToken}` },
		});
		const githubUser: GitHubUserResponse = await data.json();

		// find existing user in db
		let finalUser = await db.query.user.findFirst({ where: eq(user.github_id, githubUser.id) });

		// create a new user if one doesn't exist already
		if (!finalUser) {
			finalUser = (
				await db
					.insert(user)
					.values({
						id: randomUUID(),
						github_id: githubUser.id,
						username: githubUser.login,
					})
					.returning()
			)[0];
		}

		const session = await lucia.createSession(finalUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: "/",
			...sessionCookie.attributes, // this kinda just overrides the path above
		});

		redirect(302, "/");
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			logger.error({ type: "oauth2", error: e, id: uuid });
			error(400, { id: uuid, message: `Error ID: ${uuid}\noauth2 request error.` });
		} else {
			// rethrow the error to let handleError handle this
			throw e;
		}
	}
}

// define things that will 100% be there except when an error occurs
interface GitHubUserResponse {
	id: number;
	login: string;
}
