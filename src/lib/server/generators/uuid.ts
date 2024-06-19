import * as checks from "./lib/checks";
import { StringGenerator } from "./lib/types";
import type { AddFunction } from "./lib/types";

class UUIDFactory extends StringGenerator {
	name = "uuid";

	generate(options = {}): string {
		throw new Error("Method not implemented.");
	}
}

export const add: AddFunction = () => {	
	return new UUIDFactory()
};
