// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="unplugin-icons/types/svelte" />

declare global {
	namespace App {
		interface Error {
			message: string,
			id: string,
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	declare const APP_VER: string;
}

export {};
