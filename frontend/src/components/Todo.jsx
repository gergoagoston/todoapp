import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import "../styles/todo.css";


function Todo({ todo, handleOnClick, changeTodoState1 }) {
	return (
		<Row
			className={`todos p-3 rounded shadow border m-3 ${
				todo.done ? "completed" : ""
			}`}
		>
			<Col xs={1} className="proba2 custom-space">	
				<input
					className="checkbox border"
					checked={todo.done}
					type="checkbox"
					onChange={changeTodoState1}
				></input>
			</Col>
			<Col xs={10} className="proba">
				<span>{todo.todoname}</span>
			</Col>
			<Col xs={1} className="proba custom-space">
				<Button
					variant="outline-dark"
					className="gomb"
					onClick={handleOnClick}
				>
					<Trash />
				</Button>
			</Col>
		</Row>
	);
}

export default Todo;
