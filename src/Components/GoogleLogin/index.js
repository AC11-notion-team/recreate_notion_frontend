import React, { useState, useRef, useEffect } from "react";
import { useScript } from "./hooks/useScrip";
import jwt_deocde from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
	let navigate = useNavigate();
	const googlebuttonref = useRef();
	const [user, setuser] = useState(false);
	useEffect(() => {
		if (user === false) {
			localStorage.removeItem("zettelk_user_token");
		}
	}, [user]);
	const onGoogleSignIn = (user) => {
		let userCred = user.credential;
		let payload = jwt_deocde(userCred);
		// console.log(payload);
		setuser(payload);

		axios
			.post("http://localhost:3001/api/v1/auth/login", {
				name: payload.name,
				email: payload.email,
			})
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("zettelk_user_token", res.data.auth_token);
				localStorage.setItem("zettelk_user_id", res.data.user_id);
			})
			.catch((err) => console.log(err));
		navigate("/");
	};
	useScript("https://accounts.google.com/gsi/client", () => {
		window.google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // here's your Google ID
			callback: onGoogleSignIn,
			auto_select: false,
		});

		window.google.accounts.id.renderButton(googlebuttonref.current, {
			theme: "outline",
			size: "large",
			width: "800px",
		});
		// window.google.id.prompt();
	});
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "36px",
				width: "100%",
			}}
		>
			{!user && <div ref={googlebuttonref}></div>}
		</div>
	);
};

export default GoogleLogin;
