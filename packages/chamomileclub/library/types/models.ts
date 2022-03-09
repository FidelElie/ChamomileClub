import { Types } from "mongoose";

interface Comment {
	event?: Types.ObjectId | null,
	poll?: Types.ObjectId | null,
	body: string,
	user: Types.ObjectId,
	replies?: { user: Types.ObjectId, body: string }[]
}

interface Event {
	name?: string,
	type: "poker" | "dinner" | "games",
	users: {
		user: Types.ObjectId,
		status: "accepted" | "pending" | "declined",
		notes: string
	}[],
	startDate: Date | null,
	confirmed: boolean,
	buyIn: {
		enabled?: boolean,
		amount?: number,
		currency?: string
	},
	history?: {
		type: "comment" | "poll" | "change",
		user: Types.ObjectId,
		message: string,
		date: Date
	}[],
	comments: Types.ObjectId[],
	polls: Types.ObjectId[],
	summary: Types.ObjectId
}

interface EventSummary {
	event: Types.ObjectId,
	attendances: {
		user: Types.ObjectId,
		attended: boolean,
		late: boolean
	},
	hands: {
		user: Types.ObjectId,
		winningHand: String[],
		winnings?: Number,
		eliminated: Types.ObjectId[]
	},
	photo: string
}

interface Permission {
	name: string,
	code: string,
	description: string,
}

interface Poll {
	name: string,
	type: "general" | "buy-in" | "buy-in-amount" | "event-date" | "event-menu",
	public: boolean,
	users: Types.ObjectId[],
	event: Types.ObjectId,
	expiryDate: Date,
	settings: {
		votesPerUser?: number
	},
	items: {
		name: string,
		votes: Types.ObjectId
	}[],
	comments: Types.ObjectId[]
}

interface Role {
	name: string,
	alias: string,
	primary: boolean,
	permissions: Types.ObjectId[]
}

interface User {
	title: "Mr" | "Mrs" | "Ms" | "Miss" | null,
	forename: string,
	surname: string,
	middleNames?: string,
	position: string | null,
	description?: string | null,
	email: string,
	strategies: {
		password?: string,
		code?: string
	},
	status: {
		invited?: boolean,
		confirmed?: boolean,
		active?: boolean
	},
	photo?: string,
	primaryRole: Types.ObjectId,
	otherRoles: Types.ObjectId[],
	fullname?: string // Virtual
}

export type {
	Comment,
	Event,
	EventSummary,
	Permission,
	Poll,
	Role,
	User
}
