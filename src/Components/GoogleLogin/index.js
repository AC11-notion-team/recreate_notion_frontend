import React, { useState, useRef, useEffect } from "react";
import { useScript } from "./hooks/useScrip";
import jwt_deocde from "jwt-decode";
import axios from "axios";

const GoogleLogin = () => {
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
		// window.google.id.prompt();
	});
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			{!user && <div ref={googlebuttonref}></div>}
			{user && (
				<div>
					<h1>{user.name}</h1>
					<img src={user.picture} alt="profile" />
					<p>{user.email}</p>

					<button
						onClick={() => {
							setuser(false);
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default GoogleLogin;
