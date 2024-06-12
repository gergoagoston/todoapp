// import React, { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
// 	const [user, setUser] = useState(null);
// 	const [token, setToken] = useState(localStorage.getItem("token") || "null");
// 	const navigate = useNavigate();

//     const logIn = async (data) {

//     }

// 	return (
//         <AuthContext.Provider value={{ token, setToken, loading }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };