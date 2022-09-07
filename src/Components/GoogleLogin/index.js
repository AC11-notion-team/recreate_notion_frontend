import React, { useState, useRef, useEffect } from "react";
import { useScript } from "./hooks/useScrip";
import jwt_deocde from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";

const GoogleLogin = () => {
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
<<<<<<< HEAD
			.post("http://localhost:3001/api/v1/auth/third_party_login", {
=======
			.post(`${baseUrl}/auth/third_party_login`, {
>>>>>>> bf72d98ee13b046418e1d194c9ab163cbdcd66ab
				name: payload.name,
				email: payload.email,
			})
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("zettel_user_token", res.data.auth_token);
				localStorage.setItem("zettel_user_id", res.data.user_id);
			})
			.catch((err) => console.log(err));
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
			
		});
	});
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "60px",
			}}
		>
			{!user && <div ref={googlebuttonref}></div>}
			{user && (
				// <div>
				// 	<h1>{user.name}</h1>
				// 	<img src={user.picture} alt="profile" />
				// 	<p>{user.email}</p>

				// 	<button
				// 		onClick={() => {
				// 			setuser(false);
				// 		}}
				// 	>
				// 		Logout
				// 	</button>
				// </div>
				< Navigate to="/" replace={true} />
			)}
		</div>
	);
};

export default GoogleLogin;
