import { KEY_ALGO, KEY_TYPE } from "$env/static/private";
import { env } from "$env/dynamic/private";
import { importPKCS8, importJWK, type KeyLike } from "jose";

const rawKeyContent = env.JWT_KEY;
let key: KeyLike | Uint8Array;

if (KEY_ALGO == "none") {
	throw new Error("KEY_ALGO must not be none. This is very insecure, consider HS256 or EdDSA instead.");
}

if (rawKeyContent) {
	switch (KEY_TYPE.toLowerCase()) {
		case "jwk":
			key = await importJWK(JSON.parse(rawKeyContent));
			break;
		case "pkcs":
			key = await importPKCS8(rawKeyContent, KEY_ALGO);
			break;
		default:
			throw new Error(`unknown key type ${KEY_TYPE}`);
	}
} else {
	throw new Error("JWT_KEY is not defined or otherwise empty.");
}

// this should ensure the key is actually loaded and avoid a race condition
export function getKey() {
	return key;
}
