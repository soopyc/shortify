import { jwtVerify, type KeyLike } from "jose";
// import { getKey } from "../jwk";
// import { KEY_ALGO } from "$env/static/private";

// export function checkHeader(headers: Headers) {
// 	headers.get("Authorization")
// }

/**
 *
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
