import { redirect, error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/database";
import { links } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const result = (await db.query.links.findFirst({ where: eq(links.id, params.shortlink) }))?.to;

	if (!result) {
		error(404);
	}
	redirect(301, result);
};
