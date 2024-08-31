import * as jose from "jose";

import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { PUB_APP_NAME, PUB_DOMAIN } from "$env/static/public";
import { KEY_ALGO } from "$env/static/private";

import * as schema from "$lib/db/schema";
import { getKey } from "$lib/server/jwk";
import { generate } from "$lib/server/nanoid.js";
import { userError } from "$lib/server/responses.js";
import { db } from "$lib/server/database";
import { getLogger } from "$lib/logging.js";
import { checkIsHTTPURL } from "$lib/server/checks/url.js";
import postLink from "$lib/requests/schemas/postLink.js";

const logger = getLogger("api:link");
async function findDb(id: string) {
	return await db.query.links.findFirst({
		where: eq(schema.links.id, id),
	});
}

/**
 * `GET /api/link`: provide information about a link
 */
export async function GET({ url }) {
	const id = url.searchParams.get("id");
	if (!id) {
		return json({ message: "id parameter not provided", success: false }, { status: 400 });
	}

	const result = await findDb(id);

	if (!result || !result.to) {
		return json({ message: "not found", success: false }, { status: 404 });
	}
	return json(result);
}

/**
 * `POST /api/link`: create a new link. should return an object with
 *   - a shortlink
 *   - a JWT that authenticates edits/deletions to the link
 */
export async function POST({ request }) {
	let data;
	try {
		data = await request.json();
	} catch {
		return userError("invalid JSON data: JSON cannot be parsed.");
	}
	const parsed = postLink.safeParse(data);

	if (!parsed.success)
		return userError("schema parse error, check data parameter for more details.", { data: parsed.error.format() });

	const { longLink, customLink, length } = parsed.data;
	let shortId: string = generate(length);

	if (!checkIsHTTPURL(longLink))
		return userError("destination address is not a valid http url. ensure the protocol is http or https.");

	// TODO: handle if the url prefix is the same as the base url. that should reject properly.

	if (customLink) {
		if (await findDb(customLink))
			return userError(`shortlink \`${customLink}\` already exists, please choose a different one.`);
		shortId = customLink;
	} else {
		let attempts = 0;
		while (await findDb(shortId) && attempts < 5) {
			logger.info(`shortlink collision detected: ${shortId}`);
			attempts += 1;
			shortId = generate(length);
		}

		if (attempts >= 5)
			return userError(`shortlink generation attempt exceeded 5 times, try using a longer length. if you are using the default length, contact the site admin to raise the minimum length.`);
	}

	await db.insert(schema.links).values({
		id: shortId,
		to: longLink.trim(),
	});

	return json({
		success: true,
		shortId: shortId,
		shortlink: `https://${PUB_DOMAIN}/${shortId}`,
		key: await new jose.SignJWT({ patch: true, delete: true })
			.setProtectedHeader({ alg: KEY_ALGO })
			.setSubject(shortId)
			.setIssuer(`${PUB_APP_NAME} v${APP_VER}`)
			.sign(getKey()),
	});
}

// export async function PATCH() {}

// TODO
export async function DELETE() {
	throw new Error("Not implemented yet.");
}
