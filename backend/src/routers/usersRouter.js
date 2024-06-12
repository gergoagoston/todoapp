import express from "express";
import { getAllUsers, getUserByUserName } from "../db/users.js";

export const usersRouter = express.Router()

usersRouter.get("/users", async (req, res) => {
    const users = await getAllUsers()
    res.send(users)
})

usersRouter.get("/users/:id", async (req, res) => {
    const {id} = req.params
    const user = await getUserByUserName(id)
    res.send(user)
})


