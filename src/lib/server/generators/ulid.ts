import * as checks from "./lib/checks";
import { StringGenerator } from "./lib/types";
import { UnimplementedError } from "$lib/errors";  // TODO: remove after completion
import type { AddFunction } from "./lib/types";
import { Ulid, UlidMonotonic } from "id128"; // if we have id128 installed both should be available at no extra cost

interface UlidOptions {
	monotonic?: boolean;
}

class UlidGenerator extends StringGenerator {
	name = "ulid";

	generate(options: UlidOptions = {}): string {
		throw new UnimplementedError();
	}
}

export const add: AddFunction = () => {
	return new UlidGenerator();
};
