
CREATE TABLE IF NOT EXISTS users (
	userID SERIAL PRIMARY KEY,
	userName varchar(10) NOT NULL,
	password varchar(255)
);

CREATE TABLE IF NOT EXISTS todos (
	todoID SERIAL PRIMARY KEY,
	status INT NOT NULL,
	priority int NOT NULL,
	todoName varchar(40) NOT NULL,
	userID INT,
	FOREIGN KEY (userID) REFERENCES users(userID)
);

