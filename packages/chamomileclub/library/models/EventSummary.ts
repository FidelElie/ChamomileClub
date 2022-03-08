import mongoose from "mongoose";

const EventSummarySchema = new mongoose.Schema({
	event: { type: mongoose.Types.ObjectId, ref: "Event"},
	attendanceStatus: [{
		user: { type: mongoose.Types.ObjectId, ref: "User" },
		attended: { type: Boolean },
		late: { type: Boolean }
	}],
	history: [{
		user: { type: mongoose.Types.ObjectId, ref: "User" },
		winningHand: { type: [String] },
		winnings: { type: Number, default: 0 }
	}],
	photo: { type: String, trim: true, lowercase: true }
});

export default mongoose.models.EventSummary || mongoose.model("EventSummary", EventSummarySchema);
