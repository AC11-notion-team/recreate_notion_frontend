import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./Components/Homepage";
import LoginPage from "./Components/Loginpage/LoginPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleLogin from "./Components/GoogleLogin";
import RequireAuth from "./Components/RequireAuth"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		{/* <GoogleLogin /> */}
		<BrowserRouter>
			<Routes>
				<Route element={< RequireAuth />}>
					<Route path="/" element={<App />} />
					<Route path="/:page_id" element={<App />} />
				</Route>
				<Route path="homepage" element={<HomePage />} />
				<Route path="login-page" element={<LoginPage />} />
				<Route path="login-page-google" element={<GoogleLogin />} />
			</Routes>
		</BrowserRouter>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
