import User from "../../../../library/models/User";
import executeLambdaRoute, { type NextApiHandler } from "../../../../library/utilities/lambda";

const route: NextApiHandler = async (req, res) => {
	await executeLambdaRoute(req, res, { POST: loginUserUsingLink });
}

// ! Lambdas
const loginUserUsingLink: NextApiHandler = async (req, res) => {
	const { payload } = req.body
	const { email, link } = payload;

	try {

	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false })
	}
}

export default route;
