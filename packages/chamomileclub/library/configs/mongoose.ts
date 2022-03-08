import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
	throw new Error("Please define the MONGO_URI environment variable");
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function mongooseConnection() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		cached.promise = await mongoose.connect(MONGO_URI, { bufferCommands: false });
	}
	cached.conn = await cached.promise
	return cached.conn
}

export default mongooseConnection;
