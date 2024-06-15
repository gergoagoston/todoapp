import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../styles/dashboard.css";
import { Row, Form, Container, Button, InputGroup } from "react-bootstrap";
import Todo from "./Todo";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
function Dashboard() {
	const auth = useAuth();
	const [todos, setTodos] = useState([]);
	const [newTodoName, setNewTodoName] = useState("");

	useEffect(() => {
		const getTodos = async () => {
			const response = await axios.get(`/users/${auth.userID}/todos`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: auth.token,
				},
			});
			setTodos(response.data);
		};
		getTodos();
	}, [auth]);

	const deleteTodo = async (id) => {
		console.log(id);
		setTodos(todos.filter((todo) => todo.todoid !== id));
		await axios.delete(`/users/${auth.userID}/todos/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: auth.token,
			},
		});
	};

	const handleInputChange = (e) => {
		setNewTodoName(e.target.value);
	};

	const handleAddTodo = async () => {
		if (newTodoName.trim() !== "") {
			const response = await axios.post(
				`/users/${auth.userID}/todos`,
				{
					todoname: newTodoName,
					done: false,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: auth.token,
					},
				}
			);
			const newTodo = {
				todoid: response.data.todoid,
				done: false,
				todoname: newTodoName,
				userid: auth.userID,
			};
			setTodos([...todos, newTodo]);
			setNewTodoName("");
		}
	};

	const changeTodoState = async (id, todoname) => {
		const index = todos.findIndex(todo => todo.todoid === id);
		let temp = !todos[index].done
		console.log(todos)
		if (index !== -1) {
			const newTodos = [...todos];
			newTodos[index].done = temp 
			setTodos(newTodos);
		};
		console.log(todos)
		await axios.put(
			`/users/${auth.userID}/todos/${id}`,
			{
				todoname: todoname,
				done: temp,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: auth.token,
				},
			}
		);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
		  handleAddTodo();
		}
	  };

	return (
		<div className="main">
			<NavBar></NavBar>
			<Container className="d-flex flex-row justify-content-center ">
				<div className="border rounded shadow p-3 mt-5 custom-width">
					<Row className="justify-content-center align-self-center">
						<h1 className="text-center"> {auth.user}'s todos📋</h1>
					</Row>
					<Row>
						<InputGroup className="meret" >
							<Form.Control
								className="custom-input"
								placeholder="Add new task..."
								value={newTodoName}
								onChange={handleInputChange}
								onKeyUp={handleKeyPress}
								maxLength={33}
							/>
							<Button
								className="button-plus-size"
								variant="outline-secondary"
								id="button-addon2"
								disabled={newTodoName.trim() === ""}
								onClick={handleAddTodo}
							>
								+
							</Button>
						</InputGroup>
					</Row>
					{todos.map((todo, index) => (
						<Todo
							key={index}
							todo={todo}
							handleOnClick={() => deleteTodo(todo.todoid)}
							changeTodoState1={() => changeTodoState(todo.todoid, todo.todoname)}
						></Todo>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Dashboard;
