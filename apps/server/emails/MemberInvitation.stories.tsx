import { UserRoles } from "@thechamomileclub/api";
import { MemberInvitationEmail } from "./MemberInvitation.email";

const MemberInvitationMeta = {
  title: "Member Invitation",
};

export default MemberInvitationMeta;

export const NewUser = () => (
  <MemberInvitationEmail
    name="User"
    link="https://hello.world.dev"
    roles={[UserRoles.MEMBER]}
  />
);

export const SpecialUser = () => (
  <MemberInvitationEmail
    name="Jacob"
    link="https://hello.world.dev"
    roles={[UserRoles.FOUNDER]}
    active
  />
);
