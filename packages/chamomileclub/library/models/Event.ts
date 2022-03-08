import { Schema, model } from "mongoose";

import type { Event } from "../types";

const EventSchema = new Schema<Event>({
	name: { type: String },
	type: { type: String, required: true },
	users: [{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		status: { type: String },
		notes: { type: String }
	}],
	startDate: { type: Date, default: null },
	confirmed: { type: Boolean, default: false },
	buyIn: {
		enabled: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
 		currency: { type: Boolean, default: "GBP" }
	},
	history: [{
		type: { type: String },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		message: { type: String },
		date: { type: Date }
	}],
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	polls: [{ type: Schema.Types.ObjectId, ref: "Poll" }],
	summary: { type: Schema.Types.ObjectId, ref: "EventSummary" }
});

export default model("Event", EventSchema);
