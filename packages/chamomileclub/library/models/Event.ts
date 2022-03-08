import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
	name: { type: String },
	type: { type: String },
	users: [{
		user: { type: mongoose.Types.ObjectId, ref: "User" },
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
		body: { type: String },
		type: { type: String },
		user: { type: mongoose.Types.ObjectId, ref: "User" },
		message: { type: String },
		date: { type: Date }
	}],
	polls: [{ type: mongoose.Types.ObjectId, ref: "Poll" }],
	summary: { type: mongoose.Types.ObjectId, ref: "EventSummary" }
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
