import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { usersRouter } from "./routers/usersRouter.js";
import { authRouter } from "./routers/authRouter.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import { todosRouter } from "./routers/todosRouter.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(express.urlencoded({ extended: true }));

app.use("/api", usersRouter);
app.use("/api", authRouter);
app.use("/api",verifyToken, todosRouter);

app.listen(8080, () => {
	console.log("Server is running(8080)");
});
