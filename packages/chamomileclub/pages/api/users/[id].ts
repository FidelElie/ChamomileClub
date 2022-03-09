import type { NextApiRequest, NextApiResponse } from "next";

import User from "../../../library/models/User";
import executeLambdaRoute, { type NextApiHandler } from "../../../library/utilities/lambda";

const route: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const methods = { GET: fetchUser, PUT: confirmUser, PATCH: editUser, DELETE: deleteUser }
	await executeLambdaRoute(req, res, methods);
}

// ! Lambdas
const fetchUser: NextApiHandler = async (req, res) => {
	const { id } = req.query;

	const user = await User.findById(id);

	res.status(200).json({ success: true, payload: user });
}

const confirmUser: NextApiHandler = async (req, res) => {
	const { id } = req.query;

	res.status(200).json({ success: true });
}

const editUser: NextApiHandler = async (req, res) => {
	const { id } = req.query;

	res.status(200).json({ success: true });
}

const deleteUser: NextApiHandler = async (req, res) => {
	const { id } = req.query;

	await User.findByIdAndDelete(id);
	res.status(200).json({ success: true });
}

export default route;
