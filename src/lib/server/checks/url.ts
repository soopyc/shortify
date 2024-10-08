import { PUB_MIN_LENGTH, PUB_MAX_LENGTH } from "$env/static/public";

export function checkURLSafe(chars: string) {
	if (!chars.match(/^[\d\w-]+$/))
		throw new Error("");
}

export function checkIsHTTPURL(testString: string) {
	try {
		// needs catching
		const test = new URL(testString);
		if (test.protocol.match(/^https?:$/)) {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
}

export function checkLength(length: number) {
	if (length < Number.parseInt(PUB_MIN_LENGTH) || length > Number.parseInt(PUB_MAX_LENGTH)) {
		throw new Error(`Length is not in the range (from: ${PUB_MIN_LENGTH}; to: ${PUB_MAX_LENGTH})`);
	}
}
