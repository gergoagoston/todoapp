import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
axios.defaults.timeout = parseInt(process.env.REACT_APP_AXIOS_TIMEOUT, 10);
axios.defaults.headers["Content-Type"] =
	process.env.REACT_APP_AXIOS_CONTENT_TYPE;

function App() {
	return (
		<div>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path="/login" element={<SignIn />} />
						<Route path="/register" element={<Register />} />
						<Route element={<PrivateRoute />}>
							<Route path="/dashboard" element={<Dashboard />} />
						</Route>
						<Route path="*" element={<SignIn />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;

