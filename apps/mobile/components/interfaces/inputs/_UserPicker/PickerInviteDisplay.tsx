import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { Button, Card, COLORS, Copy, Flex, Heading, TextField } from "@thechamomileclub/ui";

import type { UserPickerSharedInterface } from "@/components/interfaces/inputs/UserPicker.data";
import { UserInviteeCreationEntity } from "@thechamomileclub/api";

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

  const isInvalidSubmission = () => {
    const validationResult = UserInviteeCreationEntity.safeParse(fields);

    return !validationResult.success;
  };

  const handleSubmission = async () => {
    // TODO Check against existing members and invitees
    if (onInvite) {
      onInvite({ ...fields, roles: fields.roles ? fields.roles : ["PROSPECT"] });
    }
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
      <Flex.Row className="items-center">
        <Button
          theme="TERTIARY"
          className="my-3 p-0 h-10 w-10 mr-2"
          onPressIn={() => setDisplay("SEARCH")}
        >
          <AntDesign name="left" color={COLORS.white} size={20} />
        </Button>
        <Button
          theme="TERTIARY"
          className="flex-grow"
          onPressIn={handleSubmission}
          disabled={isInvalidSubmission()}
        >
          <Copy color="white">Invite new member</Copy>
        </Button>
      </Flex.Row>
    </Flex.Column>
  );
};
