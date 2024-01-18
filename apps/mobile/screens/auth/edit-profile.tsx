import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView } from "react-native";

import { useQueryClient } from "@thechamomileclub/api";

import { Button, COLORS, Copy, Flex, Heading, Show, TextField } from "@thechamomileclub/ui";

import { useUpdateCurrentUser } from "@/library/queries";

import { DisplayLayout, ToggleCardButton } from "@/components/interfaces";

import { useEnsureAuth } from "@/components/providers";

const EditProfileScreen = () => {
  const { user } = useEnsureAuth();

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const originalFields = useRef({
    forename: user?.forename || "",
    surname: user?.surname || "",
    email: user?.email || "",
    public: true,
  });
  const [fields, setFields] = useState(originalFields.current);
  const [errors, setError] = useState(false);

  const updateUser = useUpdateCurrentUser({
    onMutate: () => setError(false),
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
    onError: () => setError(true),
  });

  const editFields = (data: Partial<typeof fields>) => {
    setFields((currentFields) => ({ ...currentFields, ...data }));
  };

  return (
    <DisplayLayout
      title="Edit profile"
      subtitle="Update your details"
      onBack={navigation.goBack}
      safe
    >
      <ScrollView className="flex-grow">
        <Flex.Row className="bg-midnight px-6 py-4 rounded-lg mb-3 items-center">
          <Button className="w-14 h-14 rounded-full border border-white mr-4">
            <AntDesign name="download" color={COLORS.white} size={15} />
          </Button>
          <Flex.Column>
            <Heading numberOfLines={1}>
              {user.forename} {user.surname}
            </Heading>
            <Copy
              size="sm"
              color="yellow"
              className="-mt-1.5"
              numberOfLines={1}
            >
              {user?.email}
            </Copy>
          </Flex.Column>
        </Flex.Row>
        <Heading size="sm" className="mb-2">
          Forename
        </Heading>
        <TextField
          value={fields.forename.toUpperCase()}
          placeholder="Enter forename"
          textAlign="center"
          onChangeText={(forename) => editFields({ forename })}
        />
        <Heading size="sm" className="mt-5 mb-2">
          Surname
        </Heading>
        <TextField
          value={fields.surname.toUpperCase()}
          placeholder="Enter surname"
          textAlign="center"
          onChangeText={(surname) => editFields({ surname })}
        />
        <Heading size="sm" className="mt-5 mb-2">
          Email Address
        </Heading>
        <TextField
          value={fields.email.toUpperCase()}
          placeholder="Enter email address"
          textAlign="center"
          onChangeText={(email) => editFields({ email })}
        />
        <Heading size="sm" className="mt-5 mb-2">
          Visibility
        </Heading>
        <ToggleCardButton
          classes="mb-2.5"
          title="Visible"
          subtitle={"Your account information will come\nup in searches when creating events\nand public areas."}
          toggled={fields.public}
          onToggle={() => editFields({ public: true })}
        />
        <ToggleCardButton
          title="Hidden"
          subtitle={"Your profile will not come up in any\nevent searches. (Founders will still\nbe able to find you."}
          toggled={!fields.public}
          onToggle={() => editFields({ public: false })}
        />
      </ScrollView>
      <Flex className="border-b border-white my-5 w-full" />
      <Show if={errors}>
        <Flex className="items-center">
          <Copy color="chilli">
            Sorry we couldn't update you profile, please try again later.
          </Copy>
        </Flex>
      </Show>
      <Button.Secondary onPressIn={() => updateUser.mutate({})}>
        <Copy color="green">Save</Copy>
      </Button.Secondary>
    </DisplayLayout>
  );
};

export default EditProfileScreen;
