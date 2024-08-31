import { PUB_APP_NAME } from "$env/static/public";
import { NODE_ENV } from "$env/static/private";
import { env } from "$env/dynamic/private";
import pino from "pino";

export function getLogger(name: string) {
	let transport = undefined;
	let level = env.DEBUG || "debug";

	if (NODE_ENV != "production") {
		transport = pino.transport({
			target: "pino-dev",
		});
	}

	if (!level) {
		level = "info"; // default
	}

	return pino({ name: `${PUB_APP_NAME.toLowerCase()}:server:${name}`, level }, transport);
}
