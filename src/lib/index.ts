// place files you want to import through the `$lib` alias in this folder.
import { PUB_APP_NAME } from "$env/static/public";

// utils
export function makeTitle(title?: string) {
	if (title) {
		return `${title} ‧ ${PUB_APP_NAME} v${APP_VER}`;
	} else {
		return `${PUB_APP_NAME} v${APP_VER}`;
	}
}
