import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

import svelteConfig from "./svelte.config.js";

export default [
	{
		ignores: ["build/", ".svelte-kit/", "dist/"],
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	stylistic.configs.customize({
		indent: "tab",
		semi: true,
		quotes: "double",
		braceStyle: "1tbs",
		commaDangle: "always-multiline",
	}),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig,
			},
		},
	},
];
