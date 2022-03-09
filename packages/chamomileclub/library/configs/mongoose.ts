import mongoose from "mongoose";

import APP_CONFIG from "./app";

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) { return cached.conn; }

	if (!cached.promise) {
		cached.promise = await mongoose.connect(APP_CONFIG.mongoURI, { bufferCommands: false });
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
