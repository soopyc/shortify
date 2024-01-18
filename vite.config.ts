import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";
import _package from "./package.json";

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: "svelte",
			autoInstall: true,
		}),
	],
	define: {
		APP_VER: `"${_package.version}"`,
	},
});
