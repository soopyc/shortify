import { PUB_MIN_LENGTH, PUB_MAX_LENGTH } from "$env/static/public"	

export function checkURLSafe(chars: string) {
	if (!chars.match(/^[\d\w-]+$/))
		throw new Error("")
	return
}

export function checkLength(length: number) {
	if (length < Number.parseInt(PUB_MIN_LENGTH) || length > Number.parseInt(PUB_MAX_LENGTH)) {
		throw new Error(`Length is not in the range (from: ${PUB_MIN_LENGTH}; to: ${PUB_MAX_LENGTH})`)
	}
	return
}
