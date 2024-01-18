// TODO: migrate to flat config
// https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-shared-settings

module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:svelte/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		project: true,
		sourceType: "module",
		ecmaVersion: "latest",
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
};
