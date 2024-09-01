import { jwtVerify, type KeyLike } from "jose";

/**
 * Check and return the payload of a JWT. The internal jwtVerify function will throw errors if the JWT is invalid.
 * @param jwt JWT token to check
 * @param id Subject/Shortlink ID
 * @param algorithm JWT algorithm. Should be set to KEY_ALGO from env/static/private.
 * @returns JWT payload
 */
export async function checkJWT(jwt: string, id: string, algorithm: string, key: KeyLike | Uint8Array) {
	const { payload } = await jwtVerify(jwt, key, {
		algorithms: [algorithm],
		subject: id,
	});
	return payload;
}

/**
 * Check login status based on results given in hooks.server.ts.
 * @param locals the locals object containing user and session objects.
 * @returns true if a session exists.
 */
export function checkLogin(locals: App.Locals) {
	// session validity should be validated by hooks.
	if (locals.session) return true;
	return false;
}
