import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Form,
	Row,
	Col,
	Container,
	Button,
	InputGroup,
} from "react-bootstrap";
import axios from "axios";

function SignIn() {
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

	const validateForm = () => {
		const newErrors = {};
		if (!form.username) newErrors.username = "Username is required";
		if (!form.password) newErrors.password = "Password is required";
		setErrors(newErrors);
		console.log(errors.password);
		console.log(errors.username);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(process.env.REACT_APP_AXIOS_BASE_URL);
		if (!validateForm()) return;

		try {
			const response = await axios.get(`/users/${form.username}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.data.length === 0) {
				const newErrors = {};
				newErrors.username = "Username doesn't exist!";
				setErrors(newErrors);
				return;
			}

			console.log(response.data);
		} catch (error) {
			if (error.response) {
				console.error(error.response);
			}
		}
	};

	return (
		<Container className="d-flex vh-100">
			<Row className="justify-content-center align-self-center w-100">
				<Col md={4}>
					<div className="border p-4 rounded shadow">
						<h1 className="text-center mb-4">Sign In</h1>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="pb-4" controlId="formUsername">
								<Form.Label className="fw-bold">Username</Form.Label>
								<Form.Control
									type="text"
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
								Submit
							</Button>
						</Form>
						<div className="mt-3 text-center">
							<p>Don't have an account?</p>
							<Link to="/register">Register here</Link>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default SignIn;
