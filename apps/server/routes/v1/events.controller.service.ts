import { NextApiResponse } from "next";

import { getXataClient } from "@thechamomileclub/database";
import {
	InferDTOs,
	FetchEventsInterfaces,
	CreateEventsInterfaces,
	EventStatuses,
	EventUserEntity,
	EditEventInterfaces,
	EventEntity,
	UserEntity,
	z
} from "@thechamomileclub/api";

import { ApiRequest, ApiRequestWithAuth } from "@/library/server";

import * as UserService from "@/services/User.service";

const { db } = getXataClient();

type FetchEventsDTOs = InferDTOs<typeof FetchEventsInterfaces>;

/** GET: fetch multiple events */
export const fetchEvents = async (req: ApiRequest<FetchEventsDTOs>, res: NextApiResponse) => {
	const { start, end, userId, page, entries, status } = req.query;

	const userEvents = await db.eventusers.filter({
		...(userId ? { user: userId } : {}),
		...(start ? { "event.start": { $gte: new Date(start) } } : {}),
		...(end ? { "event.start": { $gte: new Date(end) } } : {}),
		...(status ? { "event.status": status } : {})
	}).getMany();

	const events  = userEvents.length ? await db.events.filter({
		$any: userEvents.map(userEvent => ({ id: userEvent.id }))
	}).getPaginated({
		...((page || entries) ? {
			pagination: {
				size: entries || 50,
				offset: (entries || 50 * ((page || 1) - 1))
			} } : {})
	}) : { records: [] };

	const eventsWithMembers = await Promise.all(events.records.map(async event => {
		const eventMembers = await db.eventusers.filter({ event: event.id }).select(["user"]).getMany();

		const validatedEvent = EventEntity.parse(event);

		const members = eventMembers.map(member => {
			const validatedMember = EventUserEntity.merge(z.object({ user: UserEntity })).parse(member);

			return validatedMember.user;
		})

		return { ...validatedEvent, members }
	}));

	res.status(200).json({ items: eventsWithMembers } satisfies FetchEventsDTOs["response"]);
}

type CreateEventsDTOs = InferDTOs<typeof CreateEventsInterfaces>;

/** POST: Create events, create polls (if applicable) invite new users and attach existing ones */
export const createEvents = async (
	req: ApiRequestWithAuth<CreateEventsDTOs>,
	res: NextApiResponse
) => {
	const { entries } = req.body;

	const createdEvents = await Promise.all(entries.map(async entry => {
		const { name, invites, members } = entry;

		const newMembers = invites.length ? await UserService.createAndInviteNewMembers(invites) : [];

		const createdEvent = await db.events.create({
			name,
			owner: req.auth?.user.id,
			status: EventStatuses.PENDING
		});

		const validatedEvent = EventEntity.parse(createdEvent);

		const usersForEvent = [...members, ...newMembers].map(member => ({
			event: { id: validatedEvent.id },
			user: { id: member.id },
			createdAt: new Date(),
		})) satisfies Omit<EventUserEntity, "id">[];

		await db.eventusers.create(usersForEvent);

		// Notify current users of them being invited.
		return validatedEvent;
	}));

	res.status(201).json({ items: createdEvents } satisfies CreateEventsDTOs["response"]);
}

type EditEventDTOs = InferDTOs<typeof EditEventInterfaces>;

/** Edit an existing event */
export const editEvent = async (req: ApiRequestWithAuth<EditEventDTOs>, res: NextApiResponse) => {
	const { eventId } = req.params;
	const { name, status } = req.body;

	const updatedEvent = await db.events.update({
		id: eventId,
		...(name ? { name } : {}),
		...(status ? { status } : {})
	});

	const validatedEvent = EventEntity.parse(updatedEvent);

	res.status(200).json({ item: validatedEvent } satisfies EditEventDTOs["response"]);
}
