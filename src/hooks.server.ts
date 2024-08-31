import { randomUUID } from "crypto";
import { getLogger } from "$lib/server/logging";
import type { Handle, HandleServerError } from "@sveltejs/kit";
import { migrate } from "$lib/server/database";
import { lucia } from "$lib/server/lucia";

export const logger = getLogger("hooks");

export const handle: Handle = async ({ event, resolve }) => {
	// see if we have an existing session
	const sessionId = event.cookies.get(lucia.sessionCookieName) || lucia.readBearerToken(event.request.headers.get("Authorization") || "")
	if (!sessionId) {
		// bail if we don't
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	// we have a session, check if it's valid or not
	const { session, user } = await lucia.validateSession(sessionId);
	let sessionCookie;
	if (session && session.fresh) {
		sessionCookie = lucia.createSessionCookie(session.id);
	}
	if (!session) {
		sessionCookie = lucia.createBlankSessionCookie();
	}

	if (sessionCookie) {
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: "/",
			...sessionCookie.attributes
		})
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event)
}

export const handleError: HandleServerError = async ({ error, event, message, status }) => {
	const id = randomUUID();

	if (error instanceof Error) {
		switch (status) {
			case 404:
				logger.info('route does not exist: %s', event.url.pathname);
				break;
			default:
				logger.error(error, "Error ID: %s", id);
				logger.error("Unknown server error.");
		}
	} else {
		logger.error(
			"Error ID: %s\n" +
			"The caught error is not even an instance of Error. This might be because of a compiler error.\n" +
			// @ts-expect-error what do you want it's already `?.`
			"Error message (if any): %s", id, error?.message
		);
	}

	return {
		// we had to do this because we can't just use %sveltekit.error.id%... hopefully we can in the future
		message: `Error ID: ${id}\nVersion: ${APP_VER}\n` + message,
		id,
	};
};

logger.debug("successfully initialized hooks.")
await migrate()
