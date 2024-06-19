import * as checks from "./lib/checks";
import { StringGenerator } from "./lib/types";
import type { AddFunction } from "./lib/types";
const { defu } = await import("defu");
const { customAlphabet } = await import("nanoid");

interface NanoIDOptions {
	length?: number,
	characters?: string
}

const defaultOptions: Required<NanoIDOptions> = {
	length: 5,
	characters: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
}

class NanoIDGenerator extends StringGenerator {
	name = "nanoid";

	generate(options?: NanoIDOptions): string {
		const finalOptions = defu(defaultOptions, options)

		// czechs 
		checks.checkLength(finalOptions.length)
		checks.checkURLSafe(finalOptions.characters)

		return "123213213"
	}
}

export const add: AddFunction = () => {
	return new NanoIDGenerator()
};
