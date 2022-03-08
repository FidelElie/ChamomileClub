import { Schema, model } from "mongoose";

import type { User } from "../types";

const SCHEMA_OPTIONS = { timestamps: true }

const UserSchema = new Schema<User>({
	title: { type: String, trim: true, default: null },
	forename: { type: String, index: true, trim: true, required: true },
	surname: { type: String, index: true, required: true },
	middleNames: { type: String, trim: true },
	position: { type: String, default: null },
	description: { type: String, default: null },
	email: { type: String, trim: true, lowercase: true, required: true, unique: true, index: true },
	photo: { type: String, trim: true },
	primaryRole: { type: Schema.Types.ObjectId, ref: "Role" },
	otherRoles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
}, SCHEMA_OPTIONS);

UserSchema.virtual("fullname", function() {
	return [
		this.forename,
		this.middle_names ? this.middle_names : "",
		this.surname ? this.surname : ""
	]
	.filter(name => !!name)
	.join(" ");
});

export default model("User", UserSchema);
