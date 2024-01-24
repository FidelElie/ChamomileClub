import {
  CreateEventsInterfaces,
  EditEventInterfaces,
  EventEntity,
  EventStatuses,
  EventUserEntity,
  FetchEventsInterfaces,
  InferDTOs,
  UserEntity,
  z,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import { ApiRequestWithAuth, Context, UnprocessableEntityException, useEnsureAuth } from "@/library/server";

type FetchEventsDTOs = InferDTOs<typeof FetchEventsInterfaces>;
type CreateEventsDTOs = InferDTOs<typeof CreateEventsInterfaces["request"]>;
type EditEventDTOs = InferDTOs<typeof EditEventInterfaces>;

const EventsControllerService = (serviceConfig: EventsControllerServiceConfig) => {
  const { xataClient: { db }, UserService } = serviceConfig;

  return {
    /** */
    fetchEvents: async (context: Context<FetchEventsDTOs>) => {
      const { start, end, userId, page, entries, status } = context.query;

      const userEvents = await db.eventusers
        .filter({
          ...(userId ? { user: userId } : {}),
          ...(start ? { "event.start": { $gte: new Date(start) } } : {}),
          ...(end ? { "event.start": { $gte: new Date(end) } } : {}),
          ...(status ? { "event.status": status } : {}),
        })
        .getMany();

      const events = userEvents.length
        ? await db.events
          .filter({
            $any: userEvents.map((userEvent) => ({ id: userEvent.id })),
          })
          .getPaginated({
            ...(page || entries
              ? {
                pagination: {
                  size: entries || 50,
                  offset: entries || 50 * ((page || 1) - 1),
                },
              }
              : {}),
          })
        : { records: [] };

      const eventsWithMembers = await Promise.all(
        events.records.map(async (event) => {
          const eventMembers = await db.eventusers
            .filter({ event: event.id })
            .select(["user"])
            .getMany();

          const validatedEvent = EventEntity.parse(event);

          const members = eventMembers.map((member) => {
            const validatedMember = EventUserEntity.merge(
              z.object({ user: UserEntity }),
            ).parse(member);

            return validatedMember.user;
          });

          return { ...validatedEvent, members };
        }),
      );

      return {
        items: eventsWithMembers,
      } satisfies FetchEventsDTOs["response"];
    },
    /** */
    createEvents: async (context: Context<CreateEventsDTOs, ApiRequestWithAuth>) => {
      const { entries } = context.body;

      const auth = useEnsureAuth(context);

      const createdEvents = await Promise.all(
        entries.map(async (entry) => {
          const { name, invites, members } = entry;

          const newMembers = await UserService.createAndInviteNewMembers(invites);

          const createdEvent = await db.events.create({
            name,
            owner: auth?.user.id,
            status: EventStatuses.PENDING,
          });

          const validatedEvent = EventEntity.parse(createdEvent);

          const usersForEvent = [...members, ...newMembers].map((member) => ({
            event: { id: validatedEvent.id },
            user: { id: member.id },
            createdAt: new Date(),
          })) satisfies Omit<EventUserEntity, "id">[];

          await db.eventusers.create(usersForEvent);

          // Notify current users of them being invited.
          return validatedEvent;
        }),
      );

      const validationResult = CreateEventsInterfaces.responses["201"].safeParse({
        items: createdEvents,
      });

      if (!validationResult.success) {
        throw new UnprocessableEntityException("Events creating events");
      }

      return validationResult.data;
    },
    /** */
    editEvent: async (context: Context<EditEventDTOs>) => {
      const { eventId } = context.params;
      const { name, status } = context.body;

      const updatedEvent = await db.events.update({
        id: eventId,
        ...(name ? { name } : {}),
        ...(status ? { status } : {}),
      });

      const validatedEvent = EventEntity.parse(updatedEvent);

      return { item: validatedEvent } satisfies EditEventDTOs["response"];
    },
  };
};

export const createEventsControllerService = (serviceConfig: EventsControllerServiceConfig) => {
  return EventsControllerService(serviceConfig);
};

type EventsControllerServiceConfig = Pick<typeof dependencyMap, "xataClient" | "UserService">;
