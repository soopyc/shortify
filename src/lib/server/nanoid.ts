import * as checks from "./checks/url";
const { customAlphabet } = await import("nanoid");

interface NanoIDOptions {
	length?: number;
	characters?: string;
}

const options: Required<NanoIDOptions> = {
	length: 5,
	characters: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

// tests
checks.checkLength(options.length);
checks.checkURLSafe(options.characters);

// initialize
const nanoid = customAlphabet(options.characters, options.length);

export function generate(length: number): string {
	return nanoid(length);
}
