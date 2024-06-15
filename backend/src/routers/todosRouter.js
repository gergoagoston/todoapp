import express from "express";
import { getUserByUserID } from "../db/users.js";
import { userValidation } from "../validations/userValidation.js";
import { deleteTodo, addTodo, getUsersTodos, updateTodo } from "../db/todos.js";


export const todosRouter = express.Router()

todosRouter.get("/users/:userid/todos", async (req, res) => {
    const {userid} = req.params
    const user = await getUserByUserID(userid)
    if (user.length === 0) {
        return res.status(404).json({ error: "User not found" })
    }
    if (userValidation(req.header("Authorization"), userid)) {
        return res.status(401).json({ error: "Access denied" });
    }
    const todos = await getUsersTodos(userid)

    res.send(todos)
})

todosRouter.post("/users/:userid/todos", async (req, res) => {
    const {userid} = req.params
    const {todoname, done} = req.body
    const user = await getUserByUserID(userid)
    if (user.length === 0) {
        return res.status(404).json({ error: "User not found" })
    }
    if (userValidation(req.header("Authorization"), userid)) {
        return res.status(401).json({ error: "Access denied" });
    }
    const insert = await addTodo(todoname,done,userid)
    console.log(insert)
    res.send({todoid:insert.todoid})
})


todosRouter.delete("/users/:userid/todos/:todoid", async (req, res) => {
    const {userid, todoid} = req.params
    const user = await getUserByUserID(userid)
    if (user.length === 0) {
        return res.status(404).json({ error: "User not found" })
    }
    if (userValidation(req.header("Authorization"), userid)) {
        return res.status(401).json({ error: "Access denied" });
    }
    const eredmeny = await deleteTodo(todoid)
    res.send(eredmeny)
})

todosRouter.put("/users/:userid/todos/:todoid", async (req, res) => {
    const {userid, todoid} = req.params
    const {todoname, done} = req.body
    const user = await getUserByUserID(userid)
    if (user.length === 0) {
        return res.status(404).json({ error: "User not found" })
    }
    if (userValidation(req.header("Authorization"), userid)) {
        return res.status(401).json({ error: "Access denied" });
    }
    const eredmeny = await updateTodo(todoid,done,todoname)
    res.send(eredmeny)
})
