import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Form,
	Container,
	Button,
	InputGroup,
	Alert,
} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/dashboard.css";

function SignIn() {
	const auth = useAuth();
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const updateField = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const validateForm = async () => {
		const newErrors = {};
		if (!form.username) newErrors.username = "Username is required";
		if (!form.password) newErrors.password = "Password is required";

		if (form.username && form.password) {
			try {
				const response = await axios.get(`/users/${form.username}`, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.data.length === 0) {
					newErrors.username = "Username doesn't exist!";
				}
			} catch (error) {
				if (error.response) {
					console.error(error.response);
				}
			}
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!(await validateForm())) return;
		try {
			const login = await auth.login(form);
			if (login) {
				navigate("/dashboard");
			}
		} catch (error) {
			console.log(error);
			setMessage(error.response.data.error);
		}
	};

	return (
		<div>
			<NavBar></NavBar>
			<Container className="d-flex mt-5 justify-content-center">
				<div className="border p-4 rounded shadow szelesseg">
					<h1 className="text-center mb-4">Sign In</h1>
					{message && <Alert variant="danger">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group className="pb-4" controlId="formUsername">
							<Form.Label className="fw-bold">Username</Form.Label>
							<Form.Control
								type="text"
								maxLength={10}
								placeholder="Enter username"
								name="username"
								value={form.username}
								onChange={updateField}
								isInvalid={!!errors.username}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.username}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="pb-4" controlId="formPassword">
							<Form.Label className="fw-bold">Password</Form.Label>
							<InputGroup>
								<Form.Control
									type="password"
									maxLength={10}
									placeholder="Enter password"
									name="password"
									value={form.password}
									onChange={updateField}
									isInvalid={!!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Button variant="primary" type="submit" className="w-100 mt-3">
							Sign In
						</Button>
					</Form>
					<div className="mt-3 text-center">
						<p>Don't have an account yet?</p>
						<Link to="/register">Register here</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default SignIn;
