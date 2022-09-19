import React, { useState } from "react";
import userImg from "../../../image/user.png";
import check from "../../../image/check.png";
import { useInviteUsers, useInviteUpdate } from "../../../../InviteUser";
import { Checkbox } from "pretty-checkbox-react";

export default function UserInviteList({ username, email, picture }) {
	const inviteUsers = useInviteUsers();
	const changeInviteUser = useInviteUpdate();
	const callback = () => {
		changeInviteUser(username);
	};
	const user = inviteUsers.map((item) => item);

	return (
		<div className="inline">
			<div
				className="flex items-center justify-between p-2 mb-2 bg-white point flex-nowrap"
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
