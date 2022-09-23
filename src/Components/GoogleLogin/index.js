import React, { useState, useRef, useEffect } from "react";
import { useScript } from "./hooks/useScrip";
import jwt_deocde from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login } from "../../Hooks/LogStateChange"

const GoogleLogin = () => {
	const googlebuttonref = useRef();
	const [user, setuser] = useState(false);
	let navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_BASEURL;
	useEffect(() => {
		if (user === false) {
			localStorage.removeItem("zettel_user_token");
		}
	}, [user]);
	const onGoogleSignIn = (user) => {
		let userCred = user.credential;
		let payload = jwt_deocde(userCred);

		axios
			.post(`${baseUrl}/users/third_party_login`, {
				name: payload.name,
				email: payload.email,
				image: payload.picture
			})
			.then((res) => {
				Login(res.data.auth_token, res.data.user_id)
				return navigate("/app");
			})
			.catch((err) => console.error(err))
			.finally(()=>{
				setuser(payload);
			});
		
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
