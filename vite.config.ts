import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";
import _package from "./package.json";

export default defineConfig({
	build: {
		target: "esnext"
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: "svelte",
			autoInstall: true,
			defaultStyle: "vertical-align: middle; text-align: center;",
		}),
	],
	define: {
		APP_VER: `"${_package.version}"`,
	},
});
