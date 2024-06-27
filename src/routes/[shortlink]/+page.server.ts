import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { PUB_APP_NAME } from "$env/static/public";

export const load: PageServerLoad = ({setHeaders}) => {
	setHeaders({"X-Served-By": `${PUB_APP_NAME} v${APP_VER}`})
	error(404)
	// redirect()
}
