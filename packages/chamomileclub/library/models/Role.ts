import mongoose, { Schema } from "mongoose";

import type { Role } from "../types";

const RoleSchema = new Schema<Role>({
	name: { type: String, trim: true, required: true },
	alias: { type: String, trim: true, required: true, uppercase: true },
	primary: { type: Boolean },
	permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }]
});

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
