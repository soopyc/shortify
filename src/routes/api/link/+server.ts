import * as jose from "jose"
import { getKey } from "$lib/server/jwk"
import { json } from "@sveltejs/kit"
import { generate } from "$lib/server/nanoid.js"
import { PUB_APP_NAME, PUB_DOMAIN } from "$env/static/public"
import postLink from "$lib/schemas/postLink.js"
import { KEY_ALGO } from "$env/static/private"

/**
 * `GET /api/link`: provide information about a link
 */
export async function GET() {
	throw new Error("Not implemented yet.")
}

/**
 * `POST /api/link`: create a new link. should return an object with
 *   - a shortlink
 *   - a JWT that authenticates edits/deletions to the link
 */
export async function POST({ request }) {
	let data;
	try {
		data = await request.json()
	} catch (e) {
		return userError("invalid JSON data: JSON cannot be parsed.")
	}
	const parsed = postLink.safeParse(data)

	if (!parsed.success) {
		return userError("schema parse error, check data parameter for more details.", { data: parsed.error.format() })
	}
	
	const { longLink, customLink, length } = parsed.data
	// const _ = customLink
	const shortId = generate(length)
	return json({
		shortId: shortId,
		shortlink: `https://${PUB_DOMAIN}/${shortId}`,
		key: await new jose.SignJWT({ patch: true, delete: true })
			.setProtectedHeader({ alg: KEY_ALGO })
			.setSubject(shortId)
			.setIssuer(`${PUB_APP_NAME} v${APP_VER}`)
			.sign(getKey())
	})
}

// export async function PATCH() {}

export async function DELETE() {
	throw new Error("Not implemented yet.")
}
