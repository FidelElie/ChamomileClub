import { ComponentProps, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import picocolors from "picocolors";
import {
  SESClient,
  SESClientConfig,
  SendEmailCommand,
} from "@aws-sdk/client-ses";

import { MagicLinkEmail, MemberInvitationEmail } from "@/emails";

export const createSESService = (
  sesConfig: SESClientConfig,
  serviceConfig: ServiceConfig,
) => {
  const sesClient = new SESClient(sesConfig);

  return SESService(sesClient, serviceConfig);
};

export const SESService = (client: SESClient, serviceConfig: ServiceConfig) => {
  const charset = "UTF-8";

  const send = async (config: BaseSendConfig<EmailTemplate>) => {
    const Source = parseEmailSignature(config.sender || serviceConfig.sender);
    const Destination = parseEmailDestination(config);
    const Message = parseEmailMessage(config);
    const Tags = parseTags(config);

    try {
      const emailCommand = new SendEmailCommand({
        Source,
        Destination,
        Message,
        Tags,
      });

      const data = await client.send(emailCommand);

      const message = `Sent email ${
        config.id
      } to ${Destination.ToAddresses.join(", ")}`;
      console.log(`${picocolors.green(`email`)} - ${message}`);

      return { result: data, error: null };
    } catch (error) {
      const message = `Failure to send email ${
        config.id
      } to ${Destination.ToAddresses.join(", ")}`;
      console.log(`${picocolors.red("email")} - ${message}`);
      console.error(error);

      return { result: null, error };
    }
  };

  const parseTags = (config: BaseSendConfig<EmailTemplate>) => {
    const { id } = config;

    return [{ Name: "template", Value: id }];
  };

  const parseEmailDestination = (config: BaseSendConfig<EmailTemplate>) => {
    const parseSignatures = (signatures: EmailSignature[] | EmailSignature) =>
      (Array.isArray(signatures) ? signatures : [signatures]).map((signature) =>
        parseEmailSignature(signature),
      );

    return {
      ToAddresses: parseSignatures(config.to),
      ...(config.cc ? { CcAddresses: parseSignatures(config.cc) } : {}),
      ...(config.bcc ? { BccAddresses: parseSignatures(config.bcc) } : {}),
    };
  };

  const parseEmailMessage = (config: BaseSendConfig<EmailTemplate>) => {
    const { content, model, subject } = config;
    const Data =
      typeof content === "function"
        ? parseEmailTemplate(content, model)
        : content;

    return {
      Subject: { Charset: charset, Data: subject },
      Body: {
        Html: { Charset: charset, Data },
        Text: { Charset: charset, Data: Data.replace(/<[^>]*>/g, "") },
      },
    };
  };

  const parseEmailTemplate = (
    element: EmailTemplate,
    props?: ComponentProps<EmailTemplate>,
  ) => {
    return renderToStaticMarkup(createElement(element, props));
  };

  const parseEmailSignature = (
    recipient: string | { name: string; email: string },
  ) => {
    if (typeof recipient === "string") {
      return recipient;
    }

    return `${recipient.name} <${recipient.email}>`;
  };

  return {
    sendMagicLink: (config: TemplatedEmailConfig<typeof MagicLinkEmail>) =>
      send({
        ...config,
        id: "magic-link",
        subject: "Login to your account",
        content: MagicLinkEmail,
      }),
    sendMemberInvitation: (
      config: TemplatedEmailConfig<typeof MemberInvitationEmail>,
    ) =>
      send({
        ...config,
        id: "member-invitation",
        subject: "You have been invited to join!",
        content: MemberInvitationEmail,
      }),
  };
};

type ServiceConfig = {
  sender: { name: string; email: string };
};

type EmailTemplate = (props: any) => JSX.Element;
type EmailSignature = { name: string; email: string } | string;

type BaseSendConfig<T extends EmailTemplate> = {
  sender?: EmailSignature;
  to: EmailSignature[] | EmailSignature;
  cc?: EmailSignature[] | EmailSignature;
  bcc?: EmailSignature[] | EmailSignature;
  subject: string;
  content: EmailTemplate | string;
  id?: string;
  model: ComponentProps<T>;
};

type TemplatedEmailConfig<T extends EmailTemplate> = Omit<
  BaseSendConfig<T>,
  "sender" | "subject" | "content" | "tags"
>;
