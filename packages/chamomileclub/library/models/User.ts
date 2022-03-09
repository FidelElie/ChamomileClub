import mongoose, { Schema, Types } from "mongoose";
import jwt from "jsonwebtoken";

import APP_CONFIG from "../configs/app";
import type { User } from "../types";

const SCHEMA_OPTIONS = { timestamps: true }

const UserSchema = new Schema<User>({
	title: { type: String, trim: true, default: null },
	forename: { type: String, trim: true, required: true },
	surname: { type: String, required: true },
	middleNames: { type: String, trim: true },
	position: { type: String, default: null },
	description: { type: String, default: null },
	email: { type: String, trim: true, lowercase: true, required: true, unique: true, index: true },
	strategies: {
		password: { type: String },
		code: { type: String }
	},
	status: {
		invited: { type: Boolean, default: false },
		confirmed: { type: Boolean, default: false },
		active: { type: Boolean, default: true }
	},
	photo: { type: String, trim: true },
	primaryRole: { type: Schema.Types.ObjectId, ref: "Role" },
	otherRoles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
}, SCHEMA_OPTIONS);

class UserClass {
	_id: Types.ObjectId;
	email: string;
	forename: string;
	middleNames?: string;
	surname: string;

	get fullname() {
		return [
			this.forename,
			this.middleNames ? this.middleNames : "",
			this.surname ? this.surname : ""
		]
		.filter(name => !!name)
		.join(" ");
	}

	createAccessToken = () => {
		const { _id, email } = this;
		try {
			return jwt.sign(
				{ user: { _id, email }},
				APP_CONFIG.secret,
				{ expiresIn: "1h" }
			)
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	createRefreshToken = () => {
		const { _id, email } = this;
		try {
			return jwt.sign(
				{ user: { _id, email } },
				APP_CONFIG.secret,
				{ expiresIn: "1d" }
			)
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

UserSchema.loadClass(UserClass);

export default mongoose.models.User || mongoose.model("User", UserSchema);
