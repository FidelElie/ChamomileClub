import { MagicLinkEmail } from "./MagicLink.email";

const MagicLinkMeta = {
  title: "Magic Link Email",
};

export default MagicLinkMeta;

export const Base = () => (
  <MagicLinkEmail name="User" link="https://hello.world.dev" />
);
