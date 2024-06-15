import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const SECRET_KEY = dotenv.config().parsed.SECRET_KEY;

export function verifyToken(req, res, next) {
	const token = req.header("Authorization");
	if (!token) return res.status(401).json({ error: "Access denied" });
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded.username;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
}
