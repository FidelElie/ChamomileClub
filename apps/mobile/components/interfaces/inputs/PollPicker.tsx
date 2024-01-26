import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView } from "react-native";

import { PollEntity } from "@thechamomileclub/api";
import { Button, Copy, Flex, For, Switch, TextField } from "@thechamomileclub/ui";

import { KeyedPollOption, PollPickerFields } from "./PollPicker.data";

import { EventDateOption } from "@/components/interfaces/inputs/_PollPicker/EventDateOption";

export const PollPicker = (props: PollPickerProps) => {
  const { type } = props;

  const [fields, setFields] = useState<PollPickerFields>({
    name: "",
    type,
    expiresAt: null,
    votesPerUser: 1,
    options: [],
  });

  const editFields = (data: Partial<typeof fields>) =>
    setFields(currentFields => ({
      ...currentFields,
      ...data,
    }));

  const handleAddingNewOption = () => {
    const newOptionKey = fields.options.length ? Math.max(...fields.options.map(option => option.key)) + 1 : 0;

    editFields({
      options: [...fields.options, {
        key: newOptionKey,
        name: "",
        description: "",
      }],
    });
  };

  const handleRemovingOption = (pollOption: KeyedPollOption) => {
    editFields({ options: fields.options.filter(option => option.key !== pollOption.key) });
  };

  const sharedProps = { fields, editFields, handleRemovingOption };

  return (
    <Flex.Column>
      <TextField
        value={fields.name}
        placeholder="Poll name"
        onChangeText={name => editFields({ name })}
      />
      <TextField
        value={fields.votesPerUser.toString()}
        placeholder="Votes Per User"
        onChangeText={votesPerUser => editFields({ votesPerUser: parseInt(votesPerUser, 10) })}
        keyboardType="number-pad"
      />
      <ScrollView>
        <For each={fields.options}>
          {(option, optionIndex) => (
            <Flex.Row className="items-center">
              <Button onPressIn={() => handleRemovingOption(option)}>
                <AntDesign name="closecircle" />
              </Button>
              <Switch match={type} key={optionIndex}>
                <Switch.Case when="EVENT_DATE">
                  <EventDateOption option={option} {...sharedProps} />
                </Switch.Case>
              </Switch>
            </Flex.Row>
          )}
        </For>
      </ScrollView>
      <Button theme="PRIMARY" onPressIn={handleAddingNewOption}>
        <Copy color="white">Add new option</Copy>
      </Button>
    </Flex.Column>
  );
};

export interface PollPickerProps {
  type: PollEntity["type"];
}
