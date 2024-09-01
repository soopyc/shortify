// import { getLogger } from "$lib/server/logging.js";

// const logger = getLogger("actions");

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		const result: Response = await (await fetch("/api/link", {
			method: "POST",
			body: JSON.stringify({
				longLink: data.get("link"),
				customLink: data.get("custom"),
				length: Number.parseInt(data.get("length") as string ?? "0"),
			}),
		})).json();

		if (!result.success) {
			// logger.debug(result);
			return { success: result.success, message: result.message };
		}

		return {
			success: result.success,
			shortlink: result.shortlink,
			key: result.key,
		};
	},
};

interface Response {
	success: boolean;
	shortId?: string;
	shortlink?: string;
	key?: string;
	message?: string;
}
