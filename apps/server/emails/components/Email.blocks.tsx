import type { CSSProperties, ReactNode } from "react";

export const Link = ({ href, children, ...styles }: EmailComponent & { href: string }) => (
	<a
		href={href}
		style={{
			...styles,
			color: "#007F7A",
			fontFamily: "sans-serif",
			fontWeight: "bold"
		}}
	>
		{children}
	</a>
)

export const ButtonLink = ({ href, children, ...styles}: EmailComponent & { href: string }) => (
	<a
		href={href}
		style={{
			...styles,
			display: "inline-block",
			padding: "10px 15px",
			backgroundColor: "#007F7A",
			color: "#F1F1F1",
			textDecoration: "none",
			borderRadius: 5,
			fontSize: 18,
			fontWeight: "light",
			fontFamily: "sans-serif"
		}}
	>
		{children}
	</a>
)

export const Heading = ({ children, ...styles }: EmailComponent) => (
	<span
		style={{
			...styles,
			display: "inline-block",
			fontFamily: "sans-serif",
			fontSize: 30,
			letterSpacing: -1,
			color: "#171D1A",
			fontWeight: "light"
		}}
	>
		{ children }
	</span>
)

export const Copy = ({
	children,
	as: Tag = "span",
	...styles
}: EmailComponent & { as?: "span" | "i" }) => (
	<Tag style={{
		display: "inline-block",
		fontFamily: "sans-serif",
		fontWeight: "light",
		fontSize: 14,
		letterSpacing: -0.6,
		...styles
	}}>
		{ children }
	</Tag>
)

export const Section = ({ children, ...styles }: EmailComponent) => (
	<tr>
		<td style={styles}>{children}</td>
	</tr>
)

interface EmailComponent extends CSSProperties {
	children: ReactNode
}


