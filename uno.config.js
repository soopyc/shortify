import { defineConfig } from "unocss";
import { transformerDirectives } from 'unocss'
import presetTailwind from "@unocss/preset-wind";

export default defineConfig({
	presets: [presetTailwind({
		dark: "media"
	})],

	transformers: [
		transformerDirectives()
	],

	theme: {
		colors: {
			light: {
				red: "#b50303"
			},
			dark: {
				red: "#ff8080",
			},
		}
	}
})
