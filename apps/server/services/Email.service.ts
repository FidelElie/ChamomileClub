import { ComponentProps, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { singleton } from "tsyringe";
import { SESClient, SendEmailCommand, SendEmailCommandOutput } from "@aws-sdk/client-ses";

import { MagicLinkEmail, MemberInvitationEmail } from "@/emails";

@singleton()
export class EmailService {
	sender: string;
	charset: string;

	constructor(
		private readonly emailClient: SESClient,
		readonly config: { sender: { name: string, email: string }}
	) {
		this.sender = this.parseEmailSignature(config.sender);
		this.charset = "UTF-8";
	}

	sendMagicLink: SendTemplatedEmail<typeof MagicLinkEmail> = (config) => {
		return this.send({
			...config,
			id: "magic-link",
			subject: "Login to your account",
			content: MagicLinkEmail,
		})
	}

	sendMemberInvitation: SendTemplatedEmail<typeof MemberInvitationEmail> = (config) => {
		return this.send({
			...config,
			id: "member-invitation",
			subject: "You have been invited to join!",
			content: MemberInvitationEmail,
		});
	}

	sendGeneric = (config: BaseSendConfig<EmailTemplate>) => { return this.send(config); }

	// ! Internal methods for the email service
	private async send(config: BaseSendConfig<EmailTemplate>) {
		try {
			const emailCommand = new SendEmailCommand({
				Source: config.sender ? this.parseEmailSignature(config.sender) : this.sender,
				Destination: this.parseEmailDestination(config),
				Message: this.parseEmailMessage(config),
				Tags: this.parseTags(config)
			});

			const data = await this.emailClient.send(emailCommand);

			return { result: data, error: null }
		} catch (error) {
			console.error(error);

			return { result: null, error }
		}
	}

	private parseTags = (config: BaseSendConfig<EmailTemplate>) => {
		const { id } = config;

		return [{ Name: "template", Value: id }]
	}

	private parseEmailDestination = (config: BaseSendConfig<EmailTemplate>) => {
		const parseSignatures = (signatures: EmailSignature[] | EmailSignature) => (
			Array.isArray(signatures) ? signatures : [signatures]
		).map(
			signature => this.parseEmailSignature(signature)
		);

		return {
			ToAddresses: parseSignatures(config.to),
			...(config.cc ? { CcAddresses: parseSignatures(config.cc) } : {}),
			...(config.bcc ? { BccAddresses: parseSignatures(config.bcc) } : {}),
		}
	}

	private parseEmailMessage = (config: BaseSendConfig<EmailTemplate>) => {
		const { content, model, subject } = config;
		const Data = typeof content === "function" ? this.parseEmailTemplate(content, model) : content;

		return {
			Subject: { Charset: this.charset, Data: subject },
			Body: {
				Html: { Charset: this.charset, Data },
				Text: { Charset: this.charset, Data: Data.replace(/<[^>]*>/g, "") }
			}
		}
	}

	private parseEmailTemplate = (element: EmailTemplate, props?: ComponentProps<EmailTemplate>) => {
		return renderToStaticMarkup(createElement(element, props));
	}

	private parseEmailSignature(recipient: string | { name: string, email: string }) {
		if (typeof recipient === "string") { return recipient; }

		return `${recipient.name} <${recipient.email}>`;
	}
}

type EmailTemplate = (props: any) => JSX.Element
type EmailSignature = ({ name: string, email: string } | string);
type EmailResponse = Promise<
	{ result: SendEmailCommandOutput; error: null; } |
	{ result: null; error: unknown; }
>;

type BaseSendConfig<T extends EmailTemplate> = {
	sender?: EmailSignature,
	to: EmailSignature[] | EmailSignature,
	cc?: EmailSignature[] | EmailSignature,
	bcc?: EmailSignature[] | EmailSignature,
	subject: string,
	content: EmailTemplate | string,
	id?: string,
	model: ComponentProps<T>
}

type SendTemplatedEmail<T extends EmailTemplate> = (
	config: Omit<BaseSendConfig<T>, "sender" | "subject" | "content" | "tags">
) => EmailResponse;
