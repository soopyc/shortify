import { dev } from "$app/environment";
import { PUB_AUTH } from "$env/static/public";
import { github } from "$lib/server/lucia.js";
import { trueish } from "$lib/trueish.js";
import { error, redirect } from "@sveltejs/kit";
import { generateState } from "arctic";

export async function GET({ cookies }) {
	if (!PUB_AUTH || !trueish(PUB_AUTH)) {
		error(400, { id: "user-error", message: "Authentication is disabled." });
	}

	const state = generateState();
	const uri = await github.createAuthorizationURL(state);

	// set state cookie
	cookies.set("state", state, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});
	redirect(302, uri);
}
