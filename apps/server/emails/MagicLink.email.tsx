export const MagicLinkEmail = (props: MagicLinkEmailProps) => {
	const { name, link } = props;

	return (
		<div>
			<p>Hey {name}</p>
			<p>Click <a href={link}>here</a> to login to your account.</p>

			<p>This link expires in 5 minutes</p>
		</div>
	)
}

export interface MagicLinkEmailProps {
	name: string,
	link: string
}
