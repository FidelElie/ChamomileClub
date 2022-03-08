import mongoose from "mongoose";

const SCHEMA_OPTIONS = { timestamps: true }

const PollSchema = new mongoose.Schema({
	name: { type: String },
	type: { type: String }, // general | buy-in | buy-in-amount | event-date | event-menu
	public: { type: Boolean, default: false },
	users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
	event: { type: mongoose.Types.ObjectId, ref: "Event" },
	expiryDate: { type: Date, required: true },
	settings: {
		votesPerUser: { type: Number, default: 1 }
	},
	items: [{
		name: { type: String },
		votes: { type: mongoose.Types.ObjectId, ref: "User" }
	}],
	comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]
}, SCHEMA_OPTIONS);

PollSchema.virtual("expired", function() {
	return (new Date()) >= this.expiryDate;
});

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
