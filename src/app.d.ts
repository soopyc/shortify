// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="unplugin-icons/types/svelte" />

import type { User as LuciaUser, Session as LuciaSession } from "lucia";

declare global {
	namespace App {
		interface Error {
			message: string;
			id: string;
		}
		interface Locals {
			user: LuciaUser | null;
			session: LuciaSession | null;
		}
		// interface PageData {}
		// interface Platform {}
	}

	declare const APP_VER: string;
}

export {};
