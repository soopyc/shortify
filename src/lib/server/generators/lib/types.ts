export abstract class StringGenerator {
	abstract name: string;
	abstract generate(options: undefined): string;
}

export type AddFunction = () => StringGenerator;
