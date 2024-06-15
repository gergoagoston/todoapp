import express from "express";
import { createUser, getUserByUserName } from "../db/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const authRouter = express.Router();

const SECRET_KEY = dotenv.config().parsed.SECRET_KEY

authRouter.post("/auth/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const userAlreadyExists = await getUserByUserName(username)
		if (userAlreadyExists.length > 0) {
			return res.status(409).json({ error: "Username already exists" })
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		await createUser(username, hashedPassword)
		res.status(201).json({ username });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" })
	}
});

authRouter.post("/auth/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const result = await getUserByUserName(username)
		if (result.length === 0) {
			return res.status(404).json({ error: "User not found" })
		}

		const user = result[0]

		const validPassword = await bcrypt.compare(password, user.password)

		if (!validPassword) {
			return res.status(401).json({ error: "Invalid password" })
		}

		const token = jwt.sign({username, userid:user.userid}, SECRET_KEY, {
			expiresIn: "1h",
		});

		res.status(200).json({ token, userid:user.userid});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});
