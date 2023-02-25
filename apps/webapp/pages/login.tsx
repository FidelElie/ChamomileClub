import { FormEventHandler, useEffect, useState } from "react";
import type { NextPage } from "next";

import { useSendLoginRequest } from "@thechamomileclub/api";

const LoginPage: NextPage = () => {
	const [email, setEmail] = useState("");
	const [mode, setMode] = useState<"form" | "success" | "error">("form");
	const sendLoginRequest = useSendLoginRequest({
		onSuccess: () => setMode("success"),
		onError: () => setMode("error")
	});

	const handleSubmission: FormEventHandler = (event) => {
		event.preventDefault();
		sendLoginRequest.mutate({ email });
	}

	useEffect(() => {
		if (mode === "success") { setEmail(""); }
	}, [mode]);

	return (
		<div>
			<h1 className="text-xl mb-5 text-white">Login</h1>
			{
				(mode === "form" || mode === "error") && (
					<form className="space-y-2" onSubmit={handleSubmission}>
						{
							mode === "error" && (
								<p
									className="text-white cursor-pointer"
									onClick={() => setMode("form")}
								>
									An error occurred, please try again later
								</p>
							)
						}
						<input
							name="email"
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
						<button className="block px-3 py-2 bg-blue-500 text-white" type="submit">
							Submit
						</button>
					</form>
				)
			}
			{
				mode === "success" && (
					<>
						<p className="text-white">You should receive your login link to email {email}</p>
						<button
							className="block px-3 py-2 bg-blue-500 text-white"
							onClick={() => setMode("form")}
						>
							Back
						</button>
					</>
				)
			}

		</div>
	)
}

export default LoginPage;
