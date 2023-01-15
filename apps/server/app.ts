import express from "express";
import morgan from "morgan";

import { prisma } from "@chamomileclub/database";

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/auth/user", async (req, res) => {
	try {
		const user = await prisma.user.findFirst();

		res.status(200).json({ user, error: null, path: req.originalUrl });
	} catch (error) {
		res.status(500).json({ user: null, error, path: req.originalUrl });
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany();

		res.status(200).json({ items: users, error: null, path: req.originalUrl });
	} catch (error) {
		res.status(500).json({ items: [], error, path: req.originalUrl });
	}
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}/`);
})
