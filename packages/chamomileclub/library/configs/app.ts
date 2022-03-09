const APP_CONFIG = {
	// Server configs
	secret: (() => {
		const { APP_SECRET } = process.env;

		if (!APP_SECRET) { throw new Error("APP_SECRET is a required environment variable.") }

		return APP_SECRET
	})(),
	mongoURI: (() => {
		const { MONGO_URI, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env;

		const MONGO_CREDENTIALS = [MONGO_URI, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE]

		if (MONGO_CREDENTIALS.some(credential => !credential)) {
			throw new Error("Mongo credential missing: MONGO_URI, MONGO_USERNAME, MONGO_PASSWORD and MONGO_DATABASE are required.");
		}

		return MONGO_URI
			.replace("<MONGO_USERNAME>", MONGO_USERNAME)
			.replace("<MONGO_PASSWORD>", encodeURIComponent(MONGO_PASSWORD))
			.replace("<MONGO_DATABASE>", MONGO_DATABASE);
	})()
}

export default APP_CONFIG
