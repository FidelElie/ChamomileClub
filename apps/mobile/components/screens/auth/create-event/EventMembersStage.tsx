import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView } from "react-native";

import { UserCreationEntity, UserInviteeCreationEntity } from "@thechamomileclub/api";
import { COLORS } from "@thechamomileclub/common";
import { Button, Card, Copy, Flex, For, Heading, Modal, Show, twJoin } from "@thechamomileclub/ui";

import { useEnsureAuth } from "@/components/providers";

import { UserPicker } from "@/components/interfaces";

import type { CreateEventsInterface } from "@/components/screens/auth/create-event/create-event.data";

export const EventMembersStage = (props: CreateEventsInterface) => {
  const { fields, editFields, isFounder, founders } = props;

  const { user } = useEnsureAuth();

  const [showUserPicker, setShowUserPicker] = useState(false);

  const closeUserPicker = () => setShowUserPicker(false);

  const canShowAddFoundersButton = () => {
    const founderIds = founders.map(founder => founder.id);

    const allFoundersInvited = founderIds.every(
      founderId => fields.members.some(member => member.id === founderId),
    );

    return isFounder && !allFoundersInvited;
  };

  const canRemoveMember = (memberId: string) => {
    if (user.id === memberId) { return false; }

    if (isFounder) { return true; }

    const lowerPermissionMembers = fields.members.filter(
      member => !member.roles.includes("FOUNDER") && memberId !== member.id,
    );

    return lowerPermissionMembers.some(member => memberId === member.id);
  };

  const handleAddingFounders = () => {
    const currentInvitedMemberIds = fields.members.map(member => member.id);

    const otherFounders = founders.filter(user => !currentInvitedMemberIds.includes(user.id));

    editFields({
      members: [
        ...fields.members,
        ...otherFounders.map(founder => ({
          id: founder.id,
          forename: founder.forename,
          surname: founder.surname,
          email: founder.email,
          roles: founder.roles,
        })),
      ],
    });
  };

  const handleNewInvitee = (invitee: UserInviteeCreationEntity) => {
    editFields({
      invites: fields.invites.concat([invitee]),
    });
  };

  const handleExistingMember = (selectedMember: UserCreationEntity) => {
    editFields({
      members: fields.members.some(member => member.id === selectedMember.id)
        ? fields.members.filter(member => member.id !== selectedMember.id)
        : fields.members.concat([selectedMember]),
    });
  };

  return (
    <Flex.Column className="flex-grow">
      <Flex.Row className="justify-end mb-3">
        <Copy>
          <Copy color="yellow">
            {fields.members.length + fields.invites.length}
          </Copy>{" "}
          / Unlimited
        </Copy>
      </Flex.Row>
      <ScrollView>
        <For each={fields.members}>
          {(member, memberIndex) => (
            <Card
              key={member.id}
              className={twJoin(
                (memberIndex !== fields.members.length - 1 || fields.invites.length) && "mb-2.5",
              )}
            >
              <Flex.Row className="justify-between items-center">
                <Flex>
                  <Heading size="base">{member.forename} {member.surname}</Heading>
                  <Copy color="yellow" className="-mt-1">{member.roles[0]}</Copy>
                </Flex>
                <Show if={canRemoveMember(member.id)}>
                  <Button
                    onPressIn={() =>
                      editFields({
                        members: fields.members.filter(
                          currentMember => currentMember.id !== member.id,
                        ),
                      })}
                    className="pr-1"
                  >
                    <AntDesign name="closecircle" size={20} color={COLORS.white} />
                  </Button>
                </Show>
              </Flex.Row>
            </Card>
          )}
        </For>
        <For each={fields.invites}>
          {(invitee, inviteeIndex) => (
            <Card
              key={invitee.email}
              className={twJoin(inviteeIndex !== fields.members.length - 1 && "mb-2.5")}
            >
              <Flex.Row className="justify-between items-center">
                <Flex>
                  <Heading size="base">{invitee.forename} {invitee.surname}</Heading>
                  <Copy color="yellow" className="-mt-1">
                    {invitee.roles ? invitee.roles[0] || "PROSPECT" : "PROSPECT"}
                  </Copy>
                </Flex>
                <Button
                  onPressIn={() =>
                    editFields({
                      invites: fields.invites.filter(
                        currentInvitee => currentInvitee.email !== invitee.email,
                      ),
                    })}
                  className="pr-1"
                >
                  <AntDesign name="closecircle" size={20} color={COLORS.white} />
                </Button>
              </Flex.Row>
            </Card>
          )}
        </For>
        <Show if={canShowAddFoundersButton()}>
          <Flex className="bg-white h-px w-full my-5" />
          <Button className="p-0" onPressIn={handleAddingFounders}>
            <Card className="w-full relative">
              <Heading size="base">Add the other</Heading>
              <Copy color="yellow" className="-mt-1">Founders</Copy>
              <Flex className="items-center absolute bottom-4 right-3 justify-center border border-white rounded-full p-2">
                <AntDesign name="plus" size={12.5} color={COLORS.yellow} />
              </Flex>
            </Card>
          </Button>
        </Show>
      </ScrollView>
      <Button theme="TERTIARY" className="mb-5" onPressIn={() => setShowUserPicker(true)}>
        <Copy>Search members</Copy>
      </Button>
      <Modal
        visible={showUserPicker}
        onRequestClose={closeUserPicker}
        overlayClassName="bg-midnight opacity-40"
        contentClassName="bg-green pb-6 px-5"
      >
        <Flex className="bg-white h-px w-full my-5" />
        <UserPicker
          onInvite={handleNewInvitee}
          onSelect={handleExistingMember}
          currentEmails={[
            ...fields.members.map(member => member.email),
            ...fields.invites.map(invitee => invitee.email),
          ]}
        />
        <Button theme="SECONDARY" onPressIn={closeUserPicker}>
          <Copy color="green">Close</Copy>
        </Button>
      </Modal>
    </Flex.Column>
  );
};
