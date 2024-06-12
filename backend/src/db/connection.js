import database from "pg";

export const pool = new database.Pool({
	user: "postgres",
	password: "admin",
	host: "localhost",
    port: 5432,
    database: "todoDB"
});


