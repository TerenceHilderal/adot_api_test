export class APIError {
	statusCode: number | never | undefined;
	message: string;

	constructor({
		statusCode,
		message,
	}: {
		statusCode: number;
		message: string;
	}) {
		this.message = message;

		if (statusCode) {
			this.statusCode = statusCode;
		}
	}
}

export class InternalServerError extends APIError {
	constructor(message: string) {
		super({ statusCode: 500, message });
	}
}

export class BadRequest extends APIError {
	constructor(message: string) {
		super({ statusCode: 403, message });
	}
}
