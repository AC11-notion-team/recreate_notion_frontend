import React, { useState } from "react";
import user from "../image/user.png";
import userData from "../image/userData.png";
import menuLeft from "../image/menu-left.png";
import { useNavigate } from "react-router-dom";
import Logout from "../../Hooks/Logout";

export default function User({ toggle }) {
	let navigate = useNavigate();
	const [isUser, setIsUser] = useState(false);
	const handleToggle = (e) => {
		if (e.target.className.includes("User") === true) {
			setIsUser((prevUser) => !prevUser);
		}
	};
	const logout = () => {
		Logout();
		navigate("/");
	};

	const userName = localStorage.getItem("zettel_user_id");
	const userEmail = localStorage.getItem("zettel_user_email");

	return (
		<div>
			<div className="flex items-center justify-between p-2 px-4 User point group">
				<div
					className="User flex items-center group-hover:opacity-80 py-1.5 px-0.5 w-full"
					onClick={handleToggle}
				>
					<img className="w-5 h-5 mr-2 User" src={user} alt="userImg" />
					<div className="flex items-center">
						<p className="mr-1 text-sm font-medium User whitespace-nowrap">
							{" "}
							{userName}'s Zettel
						</p>
						<img className="w-4 h-3 User" src={userData} alt="userData" />
					</div>
				</div>
				<button
					className="w-6 h-6 p-1 opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded"
					onClick={toggle}
				>
					<img src={menuLeft} alt="menuLeft" />
				</button>
			</div>
			{isUser && (
				<div
					onClick={handleToggle}
					className="fixed top-0 bottom-0 left-0 w-screen User "
				>
					<div className="absolute z-10 w-64 bg-white border rounded left-3 top-12 box-shadow min-w-max">
						<div className="flex items-center justify-between p-2 mb-2 flex-nowrap ">
							<div className="flex items-center px-1">
								<img className="mr-2 w-7 h-7" src={user} alt="userImg" />
								<div className="min-w-max">
									<p className="font-semibold whitespace-pre">
										{" "}
										{userName}'s Zettel
									</p>
									<p className="ml-1 text-xs whitespace-pre">{userEmail}</p>
								</div>
							</div>
						</div>
						<hr />
						<div className="bg-gray-50">
							<div className="py-1">
								<p
									className="px-3 py-1 my-1 text-xs text-gray-600 point"
									onClick={logout}
								>
									Log out all
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
