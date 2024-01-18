import { ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useRef } from "react";
import { Image, ScrollView } from "react-native";

import { COLORS, Copy, Flex, Heading, Show } from "@thechamomileclub/ui";

import { YellowAltLogo } from "@/assets";

import { useAuth } from "@/library/providers";
import { useFetchEvents } from "@/library/queries";

import { NoEventsPlaceholder } from "@/components/interfaces";

const HomeScreen = () => {
  const { user } = useAuth();

  const currentDate = useRef(new Date().toISOString()).current;

  const eventsQuery = useFetchEvents({ start: currentDate, userId: user?.id });

  const determineTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) { return "Morning"; }

    if (currentHour >= 12 && currentHour < 18) { return "Afternoon"; }

    return "Evening";
  };

  return (
    <Flex className="bg-green h-full" safe>
      <StatusBar style="light" />
      <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Flex className="items-end px-6 mb-5">
          <Flex className="h-24 w-24 mb-0.5">
            <Image
              source={YellowAltLogo}
              className="h-full w-full"
              alt="Logo"
              resizeMode={ResizeMode.CONTAIN}
            />
          </Flex>
          <Copy size="base" className="mb-0.5">
            Good {determineTimeOfDay()},
          </Copy>
          <Heading size="2xl" numberOfLines={1} className="w-full text-right">
            {user?.forename} {user?.surname}
          </Heading>
          <Copy size="sm" color="yellow">
            {user?.roles}
          </Copy>
        </Flex>
      </MotiView>
      <Flex className="mx-5 border-b border-cream mt-1 mb-5" />
      <Flex className="flex-grow px-5">
        <ScrollView>
          <Flex.Column>
            <Heading className="mb-3">Upcoming Events</Heading>
            <Flex.Row className="h-40 w-full">
              <Skeleton
                width="100%"
                height="100%"
                colorMode="dark"
                backgroundColor={COLORS.midnight}
              >
                <Show
                  if={eventsQuery.isSuccess ? eventsQuery.data.items : null}
                >
                  {(events) =>
                    events.length
                      ? (
                        events.map((event) => (
                          <Flex key={event.id}>
                            <Copy>{event.name}</Copy>
                            <Copy>Number of members {event.members.length}</Copy>
                          </Flex>
                        ))
                      )
                      : <NoEventsPlaceholder user={user} />}
                </Show>
              </Skeleton>
            </Flex.Row>
          </Flex.Column>
        </ScrollView>
      </Flex>
    </Flex>
  );
};

export default HomeScreen;
