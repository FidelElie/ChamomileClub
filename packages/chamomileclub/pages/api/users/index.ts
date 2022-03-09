import User from "../../../library/models/User";
import executeLambdaRoute, {type NextApiHandler } from "../../../library/utilities/lambda";

const route: NextApiHandler = async (req, res) => {
	const methods = { GET: fetchUsers, POST: createUsers, PUT: editUsers }
	await executeLambdaRoute(req, res, methods);
}

// ! Lambdas
const fetchUsers: NextApiHandler = async (req, res) => {
	const users = await User.find({});

	res.status(200).json({ success: true, payload: users });
}

const createUsers: NextApiHandler = async (req, res) => {
	const { payload } = req.body;

	if (!(Array.isArray(payload)) && !(payload instanceof Object)) {
		res.status(400).json({ success: false, message: "Object or Array required." })
	}

	const entries = Array.isArray(payload) ? payload : [payload];

	const users = await User.create(entries);

	res.status(200).json({ success: true, payload: users });
}

const editUsers: NextApiHandler = async (req, res) => {
	const { payload } = req.body;

	res.status(200).json({ success: true, payload: [] });
}

export default route;
