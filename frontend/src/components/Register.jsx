import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "./NavBar";
import "../styles/dashboard.css";

function Register() {
	const auth = useAuth();
	const [message, setMessage] = useState("");
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

	const validateForm = async () => {
		const newErrors = {};
		setMessage("");
		if (!form.username) newErrors.username = "Username is required";
		if (!form.password) newErrors.password = "Password is required";
		if (!form.confirmpassword) {
			newErrors.confirmpassword = "Confirmation is required";
		} else if (form.password !== form.confirmpassword)
			newErrors.confirmpassword = "The two password doesn't match";

		if (form.password && form.username && form.confirmpassword) {
			try {
				const response = await axios.get(`/users/${form.username}`, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.data.length !== 0) {
					newErrors.username = "Username is already used";
				}
			} catch (error) {
				if (error.response) {
					setMessage("Registration failed. Please try again.");
					console.error(error.response);
				}
			}
		}
		console.log(newErrors);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!(await validateForm())) return;
		try {
			const register = auth.register(form);
			if (register) {
				setMessage("Registration successful! Redirecting to login...");
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} else {
				setMessage("Registration failed. Please try again.");
			}
		} catch (error) {
			if (error.response) {
				setMessage("Registration failed. Please try again.");
				console.error(error.response);
			}
		}
	};

	return (
		<div>
			<NavBar></NavBar>
			<Container className="d-flex  justify-content-center">
						<div className="border p-4 rounded shadow mt-5 szelesseg">
							<h1 className="text-center mb-4">Create User</h1>
							{message && (
								<Alert
									variant={
										message.includes("successful") ? "success" : "danger"
									}
								>
									{message}
								</Alert>
							)}
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
								</Form.Group>

								<Form.Group className="pb-4" controlId="formConfirmPassword">
									<Form.Label className="fw-bold">
										{" "}
										Confirm Password
									</Form.Label>
									<Form.Control
										type="password"
										maxLength={10}
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
			</Container>
		</div>
	);
}

export default Register;
