import { UserRolesEnum, UserRoles } from "@thechamomileclub/api";

import {
  EmailLayout,
  Section,
  Heading,
  ButtonLink,
  Link,
  Copy,
} from "./components";

export const MemberInvitationEmail = (props: MemberInvitationEmailProps) => {
  const { name, link, roles, active = false } = props;

  return (
    <EmailLayout
      ps={
        roles.includes(UserRoles.FOUNDER) && (
          <Section>
            <Copy marginTop={10} as="i">
              P.S Stay unruleh my friends xxx
            </Copy>
          </Section>
        )
      }
    >
      <Section>
        <Heading marginBottom={15}>Hi {name},</Heading>
      </Section>
      <Section>
        <Copy marginBottom={10}>
          {!active
            ? "You have been invited to join"
            : "Your account has been created at"}{" "}
          <Link href="https://www.thechamomileclub.com">
            The Chamomile Club
          </Link>{" "}
          Please click below to{" "}
          {!active ? "accept your invitation" : "login into your account."}
        </Copy>
      </Section>
      <Section>
        <ButtonLink href={link} marginBottom={10} marginRight={10}>
          {!active ? "Accept Invitation" : "Login"}
        </ButtonLink>
        <Copy as="i" fontSize={12.5}>
          This link expires in 20 minutes
        </Copy>
      </Section>
    </EmailLayout>
  );
};

export interface MemberInvitationEmailProps {
  name: string;
  link: string;
  roles: UserRolesEnum[];
  active?: boolean;
}
