node version: v20.14.0

To run this application first you need to run a postgresql database, here are the settings. 
{
    user: "postgres",
	password: "admin",
	host: "localhost",
    port: 5432,
    database: "todoDB"
}
After creating the database with the given name you can use the file "/backend/src/db/database.sql" to create the tables.

To run the backend and the fronted you will need to run an "npm install" command to install the dependencies in both folders(frontend, backend)
(make sure that the ports are not occupied 
    database : 5432
    fronted : 3000
    backend :8080 
)

To start the fronted and the backend you need to run "npm start" in both folders.
After these steps you can type "localhost:8080" in the browser.
