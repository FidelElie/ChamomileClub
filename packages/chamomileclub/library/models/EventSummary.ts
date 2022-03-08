import { Schema, model } from "mongoose";

import type { EventSummary } from "../types";

const EventSummarySchema = new Schema<EventSummary>({
	event: { type: Schema.Types.ObjectId, ref: "Event"},
	attendances: [{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		attended: { type: Boolean },
		late: { type: Boolean }
	}],
	hands: [{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		winningHand: { type: [String] },
		winnings: { type: Number, default: 0 }
	}],
	photo: { type: String, trim: true, lowercase: true }
});

export default model("EventSummary", EventSummarySchema);
