import {
  EmailLayout,
  ButtonLink,
  Copy,
  Heading,
  Section,
  Link,
} from "./components";

export const MagicLinkEmail = (props: MagicLinkEmailProps) => {
  const { name, link } = props;

  return (
    <EmailLayout>
      <Section>
        <Heading marginBottom={15}>Hi {name},</Heading>
      </Section>
      <Section>
        <Copy marginBottom={20}>
          Here is your link to access your{" "}
          <Link href="https://www.thechamomileclub.com">Chamomile Club</Link>{" "}
          account. Please click the button below to login:
        </Copy>
      </Section>
      <Section>
        <ButtonLink href={link} marginBottom={10} marginRight={10}>
          Login
        </ButtonLink>
        <Copy as="i" fontSize={12.5}>
          This link expires in 5 minutes
        </Copy>
      </Section>
    </EmailLayout>
  );
};

export interface MagicLinkEmailProps {
  name: string;
  link: string;
}
