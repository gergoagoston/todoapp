CREATE TABLE IF NOT EXISTS todos (
	todoID SERIAL PRIMARY KEY,
	todoName varchar(40) NOT NULL,
	todoListID SERIAL,
	FOREIGN KEY (todoListID) REFERENCES todolists(todoListID)
);


CREATE TABLE IF NOT EXISTS todolists (
	todoListID SERIAL PRIMARY KEY,
	todoListName varchar(40) NOT NULL,
	userName varchar(20) NOT NULL,
	FOREIGN KEY (userName) REFERENCES users(userName)
);

CREATE TABLE IF NOT EXISTS users (
	userName varchar(20) NOT NULL PRIMARY KEY,
	password varchar(255)
);