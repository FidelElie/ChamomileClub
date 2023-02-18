import JWT, { type VerifyOptions, type SignOptions } from "jsonwebtoken";

export default class AuthService {
	secretKey: string

	constructor(secretKey: string) {
		this.secretKey = secretKey;

		if (!secretKey) { throw new Error("Missing value for secretKey.") }
	}

	signToken(payload: string | object | Buffer, config?: SignOptions) {
		return JWT.sign(payload, this.secretKey, config);
	}

	verifyToken = <T extends string | JWT.Jwt | JWT.JwtPayload>(
		token: string,
		config?: VerifyOptions
	) => {
		try {
			const decodedToken = JWT.verify(token, this.secretKey, config);
			return { decoded: decodedToken as T, error: null }
		} catch (error) {
			return { decoded: null, error }
		}
	}

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
