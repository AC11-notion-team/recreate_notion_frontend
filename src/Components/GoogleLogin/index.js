import React, { useState, useRef, useEffect } from "react";
import { useScript } from "./hooks/useScrip";
import jwt_deocde from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
	let navigate = useNavigate();
	const googlebuttonref = useRef();
	const [user, setuser] = useState(false);
	const baseUrl = process.env.REACT_APP_BASEURL
	useEffect(() => {
		if (user === false) {
			localStorage.removeItem("zettel_user_token");
		}
	}, [user]);
	const onGoogleSignIn = (user) => {
		let userCred = user.credential;
		let payload = jwt_deocde(userCred);
		setuser(payload);

		axios
			.post(`${baseUrl}/auth/third_party_login`, {
				name: payload.name,
				email: payload.email,
			})
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("zettel_user_token", res.data.auth_token);
				localStorage.setItem("zettel_user_id", res.data.user_id);
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
	});
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "36px",
				width: "100%",
				height: "60px",
			}}
		>
			{!user && <div ref={googlebuttonref}></div>}
		</div>
	);
};

export default GoogleLogin;
