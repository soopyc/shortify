import pino from "pino";
import { PUB_APP_NAME } from '$env/static/public';

/**
 * name will get appended with app_name.
 * @param name dmsaklfhdslfjsdlfsdjfklsdj
 * @returns a pino logger instance
 */
export function getLogger(name: string) {
	return pino({name: `${PUB_APP_NAME.toLowerCase()}:client:${name}`});
}
