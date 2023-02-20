import { EmailParams, Recipient, Sender } from "mailersend";
import type { APIResponse } from "mailersend/lib/services/request.service";

import MailerSend, { EmailConfig } from "@/library/email.client";

export default class EmailService {
	emailClient: typeof MailerSend;
	sender: Sender;

	constructor(emailClient?: typeof MailerSend) {
		this.emailClient = emailClient ? emailClient : MailerSend;
		this.sender = new Sender(EmailConfig.sentEmail, EmailConfig.sentFrom)
	}

	// ! Email Handler functions
	sendMagicLink: SendEmailMethod<{ link: string, name: string, email: string }> = async (config) => {
		return await this.send({...config, subject: "Login to The Chamomile Club" });
	}

	// !Utility methods
	private async send<T extends EmailModel>(config: BaseConfig<T>) {
		const sendConfig = new EmailParams()
			.setFrom(this.sender)
			// .setTo(config.to.map(recipient => new Recipient(recipient)))

		try {
			const result = await this.emailClient.email.send(sendConfig);

			if (result.statusCode > 400) { throw result.body; }

			return { result, error: null }
		} catch (error) {
			return { result: null, error }
		}
	}

	private mergeModel(config: BaseConfig, model: { [key: string]: any }) {
		return { ...config, model: { ...config.model, ...model }}
	}
}

type EmailModel = { [key: string]: any }

type EmailRecipient = { email: string, name: string }

interface BaseConfig <ContentModel extends EmailModel = {}>{
	subject?: string,
	to: EmailRecipient[] | EmailRecipient
	cc?: EmailRecipient[] | EmailRecipient,
	bcc?: EmailRecipient[] | EmailRecipient,
	model: ContentModel
}

type EmailSendResponse = Promise<{
	result: APIResponse;
	error: null;
} | {
	result: null;
	error: unknown;
}>;

type SendEmailMethod<ContentModel extends EmailModel> = (config: BaseConfig<ContentModel>) => EmailSendResponse;
