import { singleton } from "tsyringe";
import JWT, { type VerifyOptions, type SignOptions } from "jsonwebtoken";
import { AES } from "crypto-js";

import type { KeySchemaType } from "@thechamomileclub/api";

@singleton()
export class AuthService {
	constructor(
		private readonly secret: string,
		private readonly environment: "development" | "production" | "test"
	) {}

	generateAuthLink = (accessKey: Pick<KeySchemaType, "challenge" | "id">) => {
		const isDevelopment = this.environment === "development";

		const host = isDevelopment ? "http://localhost:3000" : "https://app.thechamomileclub.com";

		return `${host}/login?id=${accessKey.id}&code=${accessKey.challenge}`;
	}

	signToken = (payload: string | object | Buffer, config?: SignOptions) => {
		return JWT.sign(payload, this.secret, config);
	}

	verifyToken = <T extends string | JWT.Jwt | JWT.JwtPayload>(
		token: string,
		config: VerifyOptions & { error?: Error, onSuccess?: (decoded: T) => void } = {}
	) => {
		const {
			error: errorToThrow,
			onSuccess,
			...jwtOptions
		} = config;

		try {
			const decodedToken = JWT.verify(token, this.secret, jwtOptions) as T;

			if (onSuccess) { onSuccess(decodedToken); }

			return { decoded: decodedToken, error: null }
		} catch (error) {
			if (errorToThrow) { throw errorToThrow; }

			return { decoded: null, error }
		}
	}

	encryptString = (input: string) => { return AES.encrypt(input, this.secret).toString(); }

	decryptString = (input: string) => { return AES.decrypt(input, this.secret).toString(); }

	generateRandomString = (length: number) => {
		if (typeof length !== "number") { throw new TypeError("length should be a integer"); }

		const alphabet = [
			"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
			"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
		];

		const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

		const chars = [...alphabet, ...numbers];

		const array = new Array(length).fill(null).map((_) => {
			const char = chars[Math.floor(Math.random() * chars.length)];

			return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
		});

		return array.join("");
	}
}
