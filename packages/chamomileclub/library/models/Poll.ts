import { Schema, model } from "mongoose";

import type { Poll } from "../types";

const SCHEMA_OPTIONS = { timestamps: true }

const PollSchema = new Schema<Poll>({
	name: { type: String },
	type: { type: String }, // general | buy-in | buy-in-amount | event-date | event-menu
	public: { type: Boolean, default: false },
	users: [{ type: Schema.Types.ObjectId, ref: "User" }],
	event: { type: Schema.Types.ObjectId, ref: "Event" },
	expiryDate: { type: Date, required: true },
	settings: {
		votesPerUser: { type: Number, default: 1 }
	},
	items: [{
		name: { type: String },
		votes: { type: Schema.Types.ObjectId, ref: "User" }
	}],
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, SCHEMA_OPTIONS);

PollSchema.virtual("expired", function() {
	return (new Date()) >= this.expiryDate;
});

export default model("Poll", PollSchema);
