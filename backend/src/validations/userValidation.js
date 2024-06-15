import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const SECRET_KEY = dotenv.config().parsed.SECRET_KEY;

export function userValidation(token, userid) {
	const decoded = jwt.verify(token, SECRET_KEY);
	return decoded.userid === userid;
}
