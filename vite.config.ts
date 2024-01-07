import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import _package from "./package.json";

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		APP_VER: `"${_package.version}"`,
	},
});
