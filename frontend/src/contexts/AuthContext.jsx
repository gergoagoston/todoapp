import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const [user, setUser] = useState(localStorage.getItem("user") || null);
	const [userID, setUserID] = useState(localStorage.getItem("userID") || null);
	const login = async (data) => {
		try {
			const login = await axios.post(
				"/auth/login",
				{
					username: data.username,
					password: data.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (login.status === 200) {
				setToken(login.data.token);
				setUser(data.username);
				setUserID(login.data.userid);
				localStorage.setItem("token", login.data.token);
				localStorage.setItem("user", data.username);
				localStorage.setItem("userID", login.data.userid);
				return true;
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
		return false;
	};

	const register = async (data) => {
		try {
			const register = await axios.post(
				"/auth/register",
				{
					username: data.username,
					password: data.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (register.status === 201) {
				return true;
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
		return false;
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		setUserID(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("userID");
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ login, token, user,userID, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
