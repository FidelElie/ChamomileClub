import { MemberInvitationEmail } from "./MemberInvitation.email";

export default {
	title: "Member Invitation",
};

export const NewUser = () => (
	<MemberInvitationEmail
		name="User"
		link="https://hello.world.dev"
		roles={["member"]}
	/>
)

export const SpecialUser = () => (
	<MemberInvitationEmail
		name="Jacob"
		link="https://hello.world.dev"
		roles={["founder"]}
		active
	/>
)
