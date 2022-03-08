import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
	name: { type: String, required: true },
	code: { type: String, required: true, index: true },
	description: { type: String }
});

export default mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
