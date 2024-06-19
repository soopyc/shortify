/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PUB_APP_NAME } from '$env/static/public';
import { NODE_ENV } from "$env/static/private";
import pino from "pino";

export function getLogger(name: string) {
	let transport = undefined;
	if (NODE_ENV != "production") {
		transport = pino.transport({
			target: "pino-dev",
		});
	}

	return pino({name: `${PUB_APP_NAME.toLowerCase()}:server:${name}`}, transport);
}
