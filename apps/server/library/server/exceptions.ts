
/** Create a custom error response for desired status code */
export class HttpException extends Error {
	message: string;
	status: number;
	metadata: any

	constructor(message: string, status: number, metadata: any) {
		super(message);
		this.message = message;
		this.status = status;
		this.metadata = metadata
	}
}

// 4xx Status Codes

/** 400: Raise a bad request error response */
export class BadRequestException extends HttpException {
	constructor(message: string) {
		super(message, 400, { reason: "Bad Request" });
	}
}

/** 401: Raise a unauthorised error response */
export class UnauthorisedException extends HttpException {
	constructor(message: string) {
		super(message, 401, { reason: "Unauthorised" });
	}
}

/** 402: Raise a payment required error response */
export class PaymentRequiredException extends HttpException {
	constructor(message: string) {
		super(message, 402, { reason: "Payment Required" });
	}
}

/** 403: Raise a forbidden error response */
export class ForbiddenException extends HttpException {
	constructor(message: string) {
		super(message, 403, { reason: "Forbidden" });
	}
}

/** 404: Raise a not found error response */
export class NotFoundException extends HttpException {
	constructor(message: string) {
		super(message, 404, { reason: "Not Found" });
	}
}

/** 409: Raise a conflict error response */
export class ConflictException extends HttpException {
	constructor(message: string) {
		super(message, 409, { reason: "Conflict" });
	}
}

/** 413: Raise a payload too large error response */
export class PayloadTooLargeException extends HttpException {
	constructor(message: string) {
		super(message, 413, { reason: "Payload too large" });
	}
}

/** 415: Raise a unsupported media type error response */
export class UnsupportedMediaTypeException extends HttpException {
	constructor(message: string) {
		super(message, 415, { reason: "Unsupported Media Type" })
	}
}

/** 418: Raise a i'm a teapot error response */
export class ImATeapotException extends HttpException {
	constructor(message: string) {
		super(message, 418, { reason: "I'm a Teapot" });
	}
}

/** 422: Raise a unprocessable entity error response */
export class UnprocessableEntityException extends HttpException {
	constructor(message: string) {
		super(message, 422, { reason: "Unprocessable Entity" });
	}
}

// 5xx Status Codes

/** 500: Raise a internal server error error response */
export class InternalServerException extends HttpException {
	constructor(message: string) {
		super(message, 500, { reason: "Internal Server Error" });
	}
}

/** 501: Raise a not implemented error response */
export class NotImplementedException extends HttpException {
	constructor(message: string) {
		super(message, 501, { reason: "Not Implemented" });
	}
}

/** 503: Raise a service unavailable error response */
export class ServiceUnavailableException extends HttpException {
	constructor(message: string) {
		super(message, 503, { reason: "Service Unavailable" });
	}
}
