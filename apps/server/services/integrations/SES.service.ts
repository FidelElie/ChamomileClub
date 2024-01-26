import { SendEmailCommand, SendEmailCommandOutput, SESClient } from "@aws-sdk/client-ses";
import picocolors from "picocolors";
import { ComponentProps, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { MagicLinkEmail, MemberInvitationEmail } from "@/emails";

const DEFAULT_SERVICE_CONFIG = { charset: "UTF-8" };

const SESService = (serviceConfig: S3ServiceConfig) => {
  const {
    client,
    suppress,
    onSuccess,
    onError,
    onSuppress,
    charset,
  } = Object.assign(DEFAULT_SERVICE_CONFIG, serviceConfig);

  const send = async (config: BaseSendConfig<EmailTemplate>) => {
    const Source = parseEmailSignature(config.sender || serviceConfig.sender);
    const Destination = parseEmailDestination(config);
    const Message = parseEmailMessage(config);
    const Tags = parseTags(config);

    const defaultSendLog = (
      config: BaseSendConfig<EmailTemplate>,
      suppressed = false,
      error = false,
    ) => {
      const message = `Sent email ${config.id} to ${Destination.ToAddresses.join(", ")}`;
      const suppressId = suppressed ? " [SUPPRESSED]" : "";
      const errorId = error ? " [ERROR]" : "";

      return `${picocolors.green("email")}${suppressId}${errorId} - ${message}`;
    };

    try {
      const emailCommand = new SendEmailCommand({
        Source,
        Destination,
        Message,
        Tags,
      });

      if (!suppress) {
        return onSuppress ? onSuppress({ config }) : defaultSendLog(config, suppress);
      }

      const data = await client.send(emailCommand);

      onSuccess ? onSuccess({ config, data }) : console.log(defaultSendLog(config));

      return { result: data, error: null };
    } catch (error) {
      onError ? onError({ error, config }) : (() => {
        console.error(defaultSendLog(config, suppress, true));
        console.error(error);
      })();

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
        parseEmailSignature(signature)
      );

    return {
      ToAddresses: parseSignatures(config.to),
      ...(config.cc ? { CcAddresses: parseSignatures(config.cc) } : {}),
      ...(config.bcc ? { BccAddresses: parseSignatures(config.bcc) } : {}),
    };
  };

  const parseEmailMessage = (config: BaseSendConfig<EmailTemplate>) => {
    const { content, model, subject } = config;
    const Data = typeof content === "function"
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
    recipient: string | { name: string; email: string; },
  ) => {
    if (typeof recipient === "string") {
      return recipient;
    }

    return `${recipient.name} <${recipient.email}>`;
  };

  return {
    send,
    sendMagicLink: (config: TemplatedEmailConfig<typeof MagicLinkEmail>) => {
      return send({
        ...config,
        id: "magic-link",
        subject: "Login to your account",
        content: MagicLinkEmail,
      });
    },
    sendMemberInvitation: (
      config: TemplatedEmailConfig<typeof MemberInvitationEmail>,
    ) => {
      send({
        ...config,
        id: "member-invitation",
        subject: "You have been invited to join!",
        content: MemberInvitationEmail,
      });
    },
  };
};

export const createSESService = (serviceConfig: S3ServiceConfig) => SESService(serviceConfig);

export type S3ServiceConfig = {
  client: SESClient;
  charset?: string;
  sender: { name: string; email: string; };
  suppress?: boolean;
  onError?: (payload: { error: unknown; config: BaseSendConfig<EmailTemplate>; }) => void;
  onSuccess?: (payload: {
    data: SendEmailCommandOutput;
    config: BaseSendConfig<EmailTemplate>;
  }) => void;
  onSuppress?: (payload: { config: BaseSendConfig<EmailTemplate>; }) => void;
};

/** biome-ignore lint/suspicious/noExplicitAny: Can take any props */
type EmailTemplate = (props: any) => JSX.Element;
type EmailSignature = { name: string; email: string; } | string;

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
