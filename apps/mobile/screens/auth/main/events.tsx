import { useState } from "react";
import { ScrollView } from "react-native";
import { Skeleton } from "moti/skeleton";

import { COLORS, Copy, Flex, Show, TextField } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";
import { useFetchEvents } from "@/library/queries";

import { DisplayLayout, NoEventsPlaceholder } from "@/components/interfaces";

const EventsScreen = () => {
  const { user } = useAuth();

  const [eventSearch, setEventSearch] = useState("");

  const eventsQuery = useFetchEvents({ userId: user?.id });

  return (
    <DisplayLayout title="Events" subtitle="Past and present" safe>
      <ScrollView className="flex-grow">
        <Skeleton
          width="100%"
          height="100%"
          colorMode="dark"
          backgroundColor={COLORS["midnight"]}
        >
          <Show if={eventsQuery.isSuccess ? eventsQuery.data.items : null}>
            {(events) =>
              events.length ? (
                events.map((event) => (
                  <Flex key={event.id}>
                    <Copy>{event.name}</Copy>
                    <Copy>Number of members {event.members.length}</Copy>
                  </Flex>
                ))
              ) : (
                <NoEventsPlaceholder user={user} />
              )
            }
          </Show>
        </Skeleton>
      </ScrollView>
      <Flex className="border-b border-white my-4 w-full" />
      <TextField
        value={eventSearch.toUpperCase()}
        onChangeText={setEventSearch}
        textAlign="center"
        placeholder="SEARCH EVENTS"
      />
    </DisplayLayout>
  );
};

export default EventsScreen;
