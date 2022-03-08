import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
	name: { type: String, trim: true, required: true },
	alias: { type: String, trim: true, required: true, uppercase: true },
	permissions: [{ type: mongoose.Types.ObjectId, ref: "Permission" }]
});

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
