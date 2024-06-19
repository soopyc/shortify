import {
	LengthNotInRange
} from "$lib/errors"

export function checkURLSafe(chars: string) {
	if (!chars.match(/^[\d\w-]+$/))
		throw new Error("")
	return
}

export function checkLength(string: string) {
	// TODO: maybe change this to be configurable?
	const MIN_LENGTH = 2;
	const MAX_LENGTH = 64;

}
