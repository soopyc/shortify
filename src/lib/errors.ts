/**
 * An error which occurs due to an error made by a user.
 * 
 * @param reason: the reason for the error
 */
export class UserError extends Error {
	constructor (reason: string) {
		super(reason)
		this.name = "UserError"
	}
}

export class LengthNotInRange extends UserError {
    constructor(min: number, max: number) {
        const message = `Invalid length: must be in the range from ${min} and ${max}.`;
        super(message)

		this.name = "LengthNotInRange"
    }
}

export class NotURLSafe extends UserError {
	constructor() {
		super("characters must consist of only URL safe characters. (i.e. a-z, A-Z, 0-9, - and _)")
		this.name = "NotURLSafe"
	}
}

/**
 * An error which happens when the developer is too tired to implement anything at a given moment
 */
export class UnimplementedError extends Error {
	constructor() {
		super("the code has yet to be implemented.")
		this.name = "UnimplementedError"
	}
}
