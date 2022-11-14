import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../index";

const loginUserUsingPassword = async ({email, password} : { email: string, password: string}) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);

		console.log(user);

		return user;
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		console.error(error.code);
		console.error(error.message);
	}
}

const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error);
	}
}

export {
	loginUserUsingPassword,
	logoutUser
}
