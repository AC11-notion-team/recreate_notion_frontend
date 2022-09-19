import React from "react";
import userImg from "../../../image/user.png";
import { useInviteUpdate } from "../../../../InviteUser";

export default function UserInviteList({ username, email, picture }) {
	const changeInviteUser = useInviteUpdate();
	const callback = () => {
		changeInviteUser(username);
	};
	
	return (
		<div className="inline w-full">
			<div className="flex items-center justify-between p-2 mb-2 bg-white  flex-nowrap point w-full"
				onClick={callback}
			>
				<div className="flex items-center justify-between ">
					<div className="flex">
						<img
							className="mr-2 w-7 h-7"
							src={picture ? picture : userImg}
							alt="userImg"
						/>
						<div className="min-w-max">
							<p className="mr-1 text-sm font-semibold whitespace-pre">
								{username}
							</p>
							<p className="text-xs text-gray-600 whitespace-pre">{email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
