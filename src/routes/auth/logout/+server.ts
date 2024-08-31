import { lucia } from '$lib/server/lucia.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ locals, cookies }) {
	if (locals.session) {
		await lucia.invalidateSession(locals.session.id);
	}
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: "/",
		...sessionCookie.attributes
	})

	redirect(302, "/")
}
