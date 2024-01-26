import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView } from "react-native";

import { UserEntity } from "@thechamomileclub/api";
import { COLORS } from "@thechamomileclub/common";
import { Button, Card, Copy, Flex, For, Heading, Show, TextField } from "@thechamomileclub/ui";

import { useDebounce } from "@/library/hooks";
import { useFetchUsers } from "@/library/queries";

import type { UserPickerSharedInterface } from "@/components/interfaces/inputs/UserPicker.data";

import { useEnsureAuth } from "@/components/providers";

export const PickerSearchDisplay = (props: UserPickerSharedInterface) => {
  const { setDisplay, onInvite, onSelect, currentEmails } = props;

  const { user } = useEnsureAuth();

  const [search, setSearch] = useState("");

  const { value, isDebouncing } = useDebounce(search, 1000);

  const usersQuery = useFetchUsers(
    { search: value },
    { enabled: value.length >= 3 },
  );

  const isWorking = isDebouncing && usersQuery.isLoading;

  const handleMemberSelection = (member: UserEntity) => {
    if (member.id === user.id) { return; }

    if (onSelect) { onSelect(member); }
  };

  return (
    <Flex.Column>
      <Show if={!!onInvite}>
        <Show if={usersQuery.isSuccess ? usersQuery.data.items : null}>
          {users => (
            <ScrollView className="max-h-32">
              <For each={users}>
                {fetchedUser => (
                  <Button
                    key={fetchedUser.id}
                    className="p-0"
                    onPressIn={() => handleMemberSelection(fetchedUser)}
                  >
                    <Card className="mb-3 w-full">
                      <Flex.Row className="items-center justify-between">
                        <Flex.Column>
                          <Heading size="base">
                            {fetchedUser.forename} {fetchedUser.surname}
                          </Heading>
                          <Copy color="yellow" className="-mt-1">{fetchedUser.roles[0]}</Copy>
                        </Flex.Column>
                        <Show if={currentEmails?.includes(fetchedUser.email)}>
                          <AntDesign name="checkcircle" color={COLORS.yellow} size={25} />
                        </Show>
                      </Flex.Row>
                    </Card>
                  </Button>
                )}
              </For>
            </ScrollView>
          )}
        </Show>
        <Button className="p-0" onPressIn={() => setDisplay("INVITE")}>
          <Card className="mb-3 w-full">
            <Flex.Row className="items-center">
              <Flex className="border-2 rounded-full border-white w-12 h-12 mr-3">
                <Flex className="h-full w-full items-center justify-center">
                  <AntDesign
                    name="plus"
                    size={20}
                    color={COLORS.yellow}
                  />
                </Flex>
              </Flex>
              <Flex.Column>
                <Heading size="base">Inviting a new member?</Heading>
                <Copy color="yellow" className="-mt-1">Click Here!</Copy>
              </Flex.Column>
            </Flex.Row>
          </Card>
        </Button>
      </Show>
      <Flex.Row className="items-center mb-3">
        <TextField
          placeholder="SEARCH MEMBERS"
          textAlign="center"
          value={search}
          className="flex-grow"
          onChangeText={setSearch}
        />
      </Flex.Row>
    </Flex.Column>
  );
};
