import mongoose from "mongoose";

const SCHEMA_OPTIONS = { timestamps: true }

const CommentSchema = new mongoose.Schema({
	event: { type: mongoose.Types.ObjectId, ref: "Event", default: null },
	poll: { type: mongoose.Types.ObjectId, ref: "Poll", default: null},
	body: { type: String, required: true },
	user: { type: mongoose.Types.ObjectId, ref: "User" },
	replies: [{
		type: { type: mongoose.Types.ObjectId }, ref: "User",
		body: { type: String, required: true }
	}]
}, SCHEMA_OPTIONS);

CommentSchema.virtual("edited", function() {
	return this.createdAt !== this.updatedAt;
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
