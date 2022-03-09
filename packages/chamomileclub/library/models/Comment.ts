import mongoose, { Schema } from "mongoose";

import type { Comment } from "../types";

const SCHEMA_OPTIONS = { timestamps: true }

const CommentSchema = new Schema<Comment>({
	event: { type: Schema.Types.ObjectId, ref: "Event", default: null },
	poll: { type: Schema.Types.ObjectId, ref: "Poll", default: null},
	body: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	replies: [{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		body: { type: String, required: true }
	}]
}, SCHEMA_OPTIONS);

CommentSchema.virtual("edited", function() {
	return this.createdAt !== this.updatedAt;
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);;
