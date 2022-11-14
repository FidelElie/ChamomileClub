import { Show } from "solid-js";
import { createRouteAction } from "solid-start";

import { useAuth } from "~/library/providers/Auth.provider";
import { logoutUser } from "~/library/firebase/functions/auth";

import { Flex, Link, Image, Button } from "~/components/core";

const Navbar = (props: NavbarProps) => {
	const {

	} = props;

	const [loggingOut, logout] = createRouteAction(logoutUser);

	const { user } = useAuth();

	const handleLogout = () => { logout(); }


	return (
		<Flex as="nav" align="center" justify="center" class="py-2 fixed w-full space-x-5">
			<Flex class="flex-grow">

			</Flex>
			<Link href="/">
				<Image src="/images/primary-logo.png" alt="Chamomile Logo" class="w-20 mr-8" />
			</Link>
			<Flex class="flex-grow" justify="end">
				<Show when={!!user}>
					<Button onClick={handleLogout}>Logout</Button>
				</Show>
			</Flex>
		</Flex>
	)
}

interface NavbarProps {

}

export default Navbar;
export type { NavbarProps }
