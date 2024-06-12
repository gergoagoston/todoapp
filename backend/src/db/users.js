import { pool } from "./connection.js";

export const getUserByUserName = async (username) => {
	try {
		const query = "SELECT * FROM users where userName = $1";
		const result = await pool.query(query, [username]);
		console.log("getUserByUserName.....completed");
		return result.rows;
	} catch (err) {
		console.error("getUserByUserName:", err);
		throw err;
	}
};
export const createUser = async (username, password) => {
	try {
		const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
		const result = await pool.query(query,[username, password]);
		console.log("createUser.....completed");
	} catch (err) {
		console.error("createUser:", err);
		throw err;
	}
};

export const getAllUsers = async () => {
	try {
		const query = "SELECT * FROM users";
		const result = await pool.query(query);
		console.log("getAllUsers.....completed");
		return result.rows;
	} catch (err) {
		console.error("getAllUsers:", err);
		throw err;
	}
};
