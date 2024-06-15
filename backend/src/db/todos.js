import { pool } from "./connection.js";

export const getUsersTodos = async (userid) => {
	try {
		const query = "SELECT * FROM todos where userid = $1 ORDER BY todoid";
		const result = await pool.query(query, [userid]);
		console.log("getUsersTodos.....completed");
		return result.rows;
	} catch (err) {
		console.error("getUsersTodos:", err);
		throw err;
	}
};

export const addTodo = async (todoName, done, userID) => {
	try {
		const query = "INSERT INTO public.todos (done, todoname, userid) VALUES ($1,$2,$3) RETURNING todoid";
		const result = await pool.query(query, [done,todoName,userID]);
		console.log("addTodo.....completed");
		return result.rows[0];
	} catch (err) {
		console.error("addTodo:", err);
		throw err;
	}
};

export const deleteTodo = async (todoid) => {
	try {
		const query = "DELETE FROM todos where todoid=$1";
		const result = await pool.query(query, [todoid]);
		console.log("deleteTodo.....completed");
		return result.rows[0];
	} catch (err) {
		console.error("deleteTodo:", err);
		throw err;
	}
};


export const updateTodo = async (todoid,done,todoname) => {
	try {
		const query = "UPDATE todos SET done=$1, todoname=$2 WHERE todoid=$3;";
		const result = await pool.query(query, [done,todoname, todoid]);
		console.log("updateTodo.....completed");
		return result.rows[0];
	} catch (err) {
		console.error("updateTodo:", err);
		throw err;
	}
};