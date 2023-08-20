import JWT, { type VerifyOptions, type SignOptions } from "jsonwebtoken";

import { AppConfig } from "../configs";

export const signToken = (payload: string | object | Buffer, config?: SignOptions) => {
	return JWT.sign(payload, AppConfig.secret, config);
}

export const verifyToken = <T extends string | JWT.Jwt | JWT.JwtPayload>(
	token: string,
	config: VerifyOptions & { error?: Error, onSuccess?: (decoded: T) => void } = {}
) => {
	const {
		error: errorToThrow,
		onSuccess,
		...jwtOptions
	} = config;

	try {
		const decodedToken = JWT.verify(token, AppConfig.secret, jwtOptions) as T;

		if (onSuccess) { onSuccess(decodedToken); }

		return { decoded: decodedToken, error: null }
	} catch (error) {
		if (errorToThrow) { throw errorToThrow; }

		return { decoded: null, error }
	}
}

export const generateRandomString = (length: number) => {
	if (typeof length !== "number") { throw new TypeError("length should be a integer"); }

	const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

	const chars = [...numbers];

	const array = new Array(length).fill(null).map((_) => {
		const char = chars[Math.floor(Math.random() * chars.length)];

		return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
	});

	return array.join("");
}
