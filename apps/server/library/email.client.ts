import { MailerSend as MailerSendClient } from "mailersend";

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const SENT_FROM = process.env.SENT_FROM;
const SENT_EMAIL = process.env.SENT_EMAIL;

if (!MAILERSEND_API_KEY) {
	throw new Error("MAILERSEND_API_KEY environment variable is missing");
}

if (!SENT_FROM) {
	throw new Error("SENT_FROM environment variable is missing");
}

if (!SENT_EMAIL) {
	throw new Error("SENT_EMAIL environment variable is missing");
}

declare global {
	var MailerSend: MailerSendClient;
}

let MailerSend: MailerSendClient;

if (process.env.NODE_ENV === "production") {
	MailerSend = new MailerSendClient({ apiKey: MAILERSEND_API_KEY });
} else {
	if (!global.MailerSend) {
		global.MailerSend = new MailerSendClient({ apiKey: MAILERSEND_API_KEY });
	}
	MailerSend = global.MailerSend;
}

const EmailConfig: { sentFrom: string, sentEmail: string } = {
	sentFrom: SENT_FROM,
	sentEmail: SENT_EMAIL
}

export default MailerSend;
export { EmailConfig }
