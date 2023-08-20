import type { ReactNode } from "react";

import { Copy, Section } from "./Email.blocks";

export const EmailLayout = ({ children, ps }: EmailLayoutProps) => {
	return (
		<div style={{ backgroundColor: "#f7f7f7", margin: 0, padding: 0 }}>
			<table
				border={0}
				cellPadding={0}
				cellSpacing={0}
				align="center"
				style={{
					tableLayout: 'fixed',
					backgroundColor: "white",
					borderRadius: 5,
					maxWidth: 640,
					width: "100%"
				}}
			>
				<tbody>
					<Section
						backgroundColor="#24383B"
						textAlign="center"
						padding="5px 0"
					>
						<img
							src="https://thechamomilebucket.s3.eu-west-2.amazonaws.com/assets/logo-original.png"
							height={70}
						/>
					</Section>
					<Section>
						<table
							style={{ tableLayout: "fixed", width: "100%", padding: "30px 45px" }}
							align="center"
						>
							<tbody>
								{children}
								<Section>
									<Copy marginBottom={10} marginTop={10} color="#007F7A">
										If you have any questions or comments, please do not hesitate to reply to this email.
									</Copy>
								</Section>
								<Section marginBottom={5}>
									<Copy fontSize={13}>Cheers,</Copy>
								</Section>
								<Section>
									<Copy fontSize={13}>The Chamomile Club Team</Copy>
								</Section>
								{ ps }
							</tbody>
						</table>
					</Section>
					<Section
						padding={15}
						backgroundColor="#24383B"
						textAlign="center"
					>
						<Copy fontSize={12} color="white">
							&copy; The Chamamomile Club {new Date().getFullYear()} - All Rights Reserved
						</Copy>
					</Section>
				</tbody>
			</table>
		</div>
	)
}

export interface EmailLayoutProps {
	children: ReactNode,
	ps?: ReactNode
}

