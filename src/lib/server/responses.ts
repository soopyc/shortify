import { json } from "@sveltejs/kit";

export function userError(message: string, rest: object = {}) {
	return json({
		success: false,
		message,
		...rest,
	}, { status: 400 });
}
