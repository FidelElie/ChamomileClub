import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { Button, Card, COLORS, Copy, Flex, Heading, TextField } from "@thechamomileclub/ui";

import type { UserPickerSharedInterface } from "../UserPicker.data";

export const PickerInviteDisplay = (props: UserPickerSharedInterface) => {
  const { setDisplay, onInvite, addRoles } = props;

  const [fields, setFields] = useState({
    forename: "",
    surname: "",
    email: "",
    ...(addRoles ? { roles: [] } : {}),
  });

  const editFields = (data: Partial<typeof fields>) => {
    setFields(currentFields => ({ ...currentFields, ...data }));
  };

  return (
    <Flex.Column>
      <Card>
        <Flex.Row className="items-center">
          <Button className="w-14 h-14 rounded-full border border-white mr-4">
            <AntDesign name="download" color={COLORS.white} size={15} />
          </Button>
          <Flex.Column>
            <Heading size="base" numberOfLines={1}>
              {(fields.forename || fields.surname) ? `${fields.forename} ${fields.surname}` : "Full name"}
            </Heading>
            <Copy color="yellow" className="-mt-1">{fields.email || "Email"}</Copy>
          </Flex.Column>
        </Flex.Row>
      </Card>
      <Flex.Row className="my-3">
        <TextField
          placeholder="First Name"
          className="mr-2 flex-grow"
          value={fields.forename}
          onChangeText={forename => editFields({ forename })}
        />
        <TextField
          placeholder="Last Name"
          className="flex-grow"
          value={fields.surname}
          onChangeText={surname => editFields({ surname })}
        />
      </Flex.Row>
      <TextField
        placeholder="Email"
        value={fields.email}
        onChangeText={email => editFields({ email })}
      />
      <Button theme="SECONDARY" className="my-3" onPressIn={() => setDisplay("SEARCH")}>
        <Copy color="green">Back</Copy>
      </Button>
    </Flex.Column>
  );
};
