import * as argon2 from "argon2";

import User from "../../../../library/models/User";
import executeLambdaRoute, { type NextApiHandler } from "../../../../library/utilities/lambda";

const route: NextApiHandler = async (req, res) => {
	await executeLambdaRoute(req, res, { POST: loginUserUsingCredentials });
}

// ! Lambdas
const loginUserUsingCredentials: NextApiHandler = async (req, res) => {
	const { payload } = req.body
	const { email, password } = payload;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({ success: false, message: "User does not exist" });
	}

	const credentialsMatch = await argon2.verify(user.strategies.password, password);

	if (!credentialsMatch) {
		return res.status(401).json({ success: false, message: "Incorrect password"})
	}

	const token = user.createAccessToken();
	const refresh = user.createRefreshToken();

	return res.status(201).json({ payload: { token, refresh, user }})
}

export default route;
