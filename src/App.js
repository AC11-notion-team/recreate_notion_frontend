import logo from "./logo.svg";
// import './App.css';
import PageHeader from "./Components/PageHeader";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Editor from "./Components/Editor";
import React, { useState } from "react";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
	const [showSidebar, setShowSidebar] = useState(true);
	// const toggleSidebar = () => setShowSidebar(prev => !prev)
	function toggleSidebar() {
		console.log("toggle");
		setShowSidebar((prev) => !prev);
	}
	return (
		<div className="flex w-full">
			<div className="w-3/12">{showSidebar && <Sidebar />}</div>
			<div className="w-9/12">
				<Header handleSidebar={toggleSidebar} />
				<PageHeader />
				<Editor />
			</div>
			<Routes>
				<Route path="/signin" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
