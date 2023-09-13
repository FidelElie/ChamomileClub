import { NextApiResponse } from "next"

export const httpResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
	>(res: NextResponse, config: { status: number, message: string, data?: { [key: string]: any } }) => {
	return res.status(config.status).json({
		status: config.status,
		message: config.message,
		...config.data
	});
}

export const okResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, jsonPayload: any) => {
	res.status(200).json(jsonPayload);
	return jsonPayload
}

export const createdResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, jsonPayload: any) => {
	res.status(201).json(jsonPayload)
	return jsonPayload;
}

export const badRequestResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 400,
	message,
	data: { reason: "Bad Request" }
});

export const unauthorisedResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 401,
	message,
	data: { reason: "Unauthorised" }
});

export const paymentRequiredResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 402,
	message,
	data: { reason: "Payment Required" }
});

export const forbiddenResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 403,
	message,
	data: { reason: "Forbidden" }
});

export const notFoundResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 404,
	message,
	data: { reason: "Not Found" }
});

export const conflictResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 409,
	message,
	data: { reason: "Conflict" }
});

export const payloadTooLargeResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 413,
	message,
	data: { reason: "Payload Too Large" }
});

export const unsupportedMediaTypeResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 415,
	message,
	data: { reason: "Unsupported Media Type" }
});

export const imATeapotResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 418,
	message,
	data: { reason: "I'm a Teapot" }
});

export const unprocessableEntityResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 422,
	message,
	data: { reason: "Not Found" }
});

export const internalServerErrorResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 500,
	message,
	data: { reason: "Internal Server Error" }
});

export const notImplementedResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 501,
	message,
	data: { reason: "Not Implemented" }
});

export const serviceUnavailableResponse = <
	NextResponse extends NextApiResponse = NextApiResponse
>(res: NextResponse, message: string) => httpResponse(res, {
	status: 403,
	message,
	data: { reason: "Service Unavailable" }
});
