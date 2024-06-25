import { randomUUID } from "crypto";
import { getLogger } from "$lib/server/logging";
import type { HandleServerError } from "@sveltejs/kit";

export const logger = getLogger("hooks");

export const handleError: HandleServerError = ({ error, event, message, status }) => {
	const id = randomUUID();

	if (error instanceof Error) {
		if (status >= 500) {
			logger.error(error.message)
			logger.error(error, "Error ID: %s", id);
		} else {
			switch (status) {
				case 404:
					logger.info('route does not exist: %s', event.url.pathname);
					break;
				default:
					logger.error(error, "Unknown client error.")
			}
		}
	} else {
		logger.error(
			"Error ID: %s\n" + 
			"The caught error is not even an instance of Error. This might be because of a compiler error.\n" +
			// @ts-expect-error what do you want it's already `?.`
			"Error message (if any): %s", id, error?.message
		)
	}

	return {
		// we had to do this because we can't just use %sveltekit.error.id%... hopefully we can in the future
		message: `Error ID: ${id}\nVersion: ${APP_VER}\n` + message,
		id,
	};
};

logger.info("successfully initialized hooks.")
