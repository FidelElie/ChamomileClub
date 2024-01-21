import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { Button, Card, COLORS, Copy, Flex, Heading, Show, TextField } from "@thechamomileclub/ui";

import { useDebounce } from "@/library/hooks";
import { useFetchUsers } from "@/library/queries";

import type { UserPickerSharedInterface } from "../UserPicker.data";

export const PickerSearchDisplay = (props: UserPickerSharedInterface) => {
  const { setDisplay, onInvite } = props;

  const [search, setSearch] = useState("");

  const { value, isDebouncing } = useDebounce(search, 1000);

  const usersQuery = useFetchUsers(
    { search: value },
    { enabled: value.length >= 3 },
  );

  const isWorking = isDebouncing && usersQuery.isLoading;

  return (
    <Flex.Column>
      <Show if={!!onInvite}>
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
