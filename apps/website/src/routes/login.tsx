import { createSignal } from "solid-js";
import { createRouteAction } from "solid-start";

import { loginUserUsingPassword } from "~/library/firebase/functions/auth";

import { Form, Main, TextField, Button, Flex, Image, Link, Heading } from "~/components/core";
import { Navbar } from "~/components/interfaces/App";

const LoginPage = () => {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [loggingIn, login] = createRouteAction(loginUserUsingPassword);

	const handleLogin = () => {
		login({ email: email(), password: password() });
	}

	return (
		<Main
			title="The Chamomile Club | Login"
			header={<Navbar/>}
		>
			<Flex class="w-full h-full" align="center" justify="center">
				<Form class="space-y-5 w-72" onSubmit={handleLogin}>
					<Heading class="text-2xl text-cream">Login</Heading>
					<Flex direction="col" class="space-y-1">
						<TextField
							id="email"
							label="Email Address"
							value={email()}
							onChange={setEmail}
							placeholder="Email Address"
							class="w-full"
							type="email"
							/>
						<TextField
							id="password"
							label="Password"
							placeholder="Password"
							value={password()}
							onChange={setPassword}
							type="password"
							class="w-full"
						/>
					</Flex>
					<Button.Submit
						class="px-3 py-2 bg-cyan text-white w-full disabled:opacity-50"
						disabled={loggingIn.pending}
					>
						Submit
					</Button.Submit>
				</Form>
			</Flex>
		</Main>
	)
}

export default LoginPage;
