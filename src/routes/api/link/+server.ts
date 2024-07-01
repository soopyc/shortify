import * as jose from "jose"
import postLink from "$lib/requestSchemas/postLink.js"

import { json } from "@sveltejs/kit"
import { PUB_APP_NAME, PUB_DOMAIN } from "$env/static/public"
import { KEY_ALGO } from "$env/static/private"

import { getKey } from "$lib/server/jwk"
import { generate } from "$lib/server/nanoid.js"
import { userError } from "$lib/server/responses.js"
import { exists } from "$lib/server/database"
import { getLogger } from "$lib/logging.js"

const logger = getLogger("api:link")

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
	let shortId: string = generate(length)

	if (customLink) {
		if (await exists(customLink)) {
			return userError(`shortlink ${customLink} already exists, please choose a different one.`)
		}
		shortId = customLink
	} else {
		let attempts = 0;
		while (await exists(shortId) && attempts < 5) {
			logger.info(`shortlink collision detected: ${shortId}`)
			attempts += 1
			shortId = generate(length)
		}

		if (attempts >= 5) {
			return userError(`shortlink generation attempt exceeded 5 times, try using a longer length. if you are using the default length, contact the site admin to raise the default and minimum length.`)
		}
	}

	// TODO: send to db

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
