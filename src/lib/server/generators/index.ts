// allow for the ability to adaptively import/use generators at will during runtime
// please PR if there's a better way
import type { StringGenerator } from "./lib/types";
let initialized = false;

const GENERATOR_MODULES = [];
const generators: Record<string, StringGenerator> = {};

export function load() {
	if (initialized) {
		throw new Error('generators can be initialized once only. please make sure it is done on the server side.')
	}
	initialized = true;

	throw new Error("unimplemented.")
	let _: unknown = GENERATOR_MODULES
	_ = generators
	return _
}
