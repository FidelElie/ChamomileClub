import mongoose from "mongoose";

const SCHEMA_OPTIONS = { timestamps: true }

const UserSchema = new mongoose.Schema({
	title: { type: String, trim: true },
	forename: { type: String, index: true, trim: true, required: true },
	surname: { type: String, index: true, required: true },
	middleNames: { type: String, trim: true },
	position: { type: String, default: null },
	description: { type: String, default: null },
	email: { type: String, trim: true, lowercase: true, required: true, unique: true, index: true },
	photo: { type: String, trim: true },
	roles: [{ type: mongoose.Types.ObjectId, ref: "Role" }]
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

export default mongoose.models.User || mongoose.model("User", UserSchema);
