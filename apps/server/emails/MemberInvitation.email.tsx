import type { RoleNames } from "@thechamomileclub/database";

export const MemberInvitationEmail = (props: MemberInvitationEmailProps) => {
	const { name, link, roles } = props;

	return (
		<div>
			<p>Hey {name}</p>
			<p>You have been invited to join The Chamomile Club</p>
			<p>Click <a href={link}>here</a> to login to your account.</p>
			<p>Your roles are {roles.join(", ")}</p>
		</div>
	)
}

export interface MemberInvitationEmailProps {
	name: string,
	link: string,
	roles: RoleNames[]
}
