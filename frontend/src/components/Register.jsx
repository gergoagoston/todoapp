import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmpassword: "",
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
		if (!form.confirmpassword) {
			newErrors.confirmpassword = "Confirmation is required";
		} else if (form.password !== form.confirmpassword)
			newErrors.confirmpassword = "The two password doesn't match";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		try {
			const response = await axios.get(`/users/${form.username}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.data.length !== 0) {
				const newErrors = {};
				newErrors.username = "Username is already used";
				setErrors(newErrors);
				return;
			}
			const register = await axios.post(
				"/auth/register",
				{
					username: form.username,
					password: form.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (register.status === 201) {
				navigate("/login")
			}

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
						<h1 className="text-center mb-4">Create User</h1>
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
							</Form.Group>

							<Form.Group className="pb-4" controlId="formConfirmPassword">
								<Form.Label className="fw-bold"> Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm password"
									name="confirmpassword"
									value={form.confirmpassword}
									onChange={updateField}
									isInvalid={!!errors.confirmpassword}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.confirmpassword}
								</Form.Control.Feedback>
							</Form.Group>
							<Button variant="primary" type="submit" className="w-100 mt-3">
								Register
							</Button>
						</Form>
						<div className="mt-3 text-center">
							<p>You already have an account?</p>
							<Link to="/login">Sign in here</Link>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Register;
