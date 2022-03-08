import { Schema, model } from "mongoose";

import type { Permission } from "../types";

const PermissionSchema = new Schema<Permission>({
	name: { type: String, required: true },
	code: { type: String, required: true, index: true },
	description: { type: String }
});

export default model("Permission", PermissionSchema);
