import React, { useEffect, useState } from "react";
import globe from "../image/globe.png";
import question from "../image/question.png";
import link from "../image/link.png";
import http from "../image/http.png";
import MenuButton from "./MenuButton";
import axios from "axios";
import ShareLink from "./ShareLink";

export default function Share(props) {
	console.log("--------");
	console.log(props);
	console.log("--------");

	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isShare, setIsShare] = useState(false);
	const handleToggle = (e) => {
		if (e.target.className.includes("IsShare") === true) {
			setIsShare((prevShare) => !prevShare);
		}
	};
	const [isInvite, setIsInvite] = useState(false);
	useEffect(() => {
		if (isInvite) {
			// axios({
			// 	method: "put",
			// 	url: `${baseUrl}/pages/` + currentPageID,
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			// 	},
			// });
		}
	}, [isInvite]);
	const IsInvite1 = () => {
		setIsInvite((prevIsInvite) => !prevIsInvite);
	};

	return (
		<div className="flex items-center">
			<MenuButton
				className="IsShare"
				handleClick={handleToggle}
				content="Share"
			/>

			{isShare && (
				<div
					onClick={handleToggle}
					className="IsShare fixed  w-screen top-0 bottom-0 left-0 z-20"
				>
					<div className="absolute border-2 bg-white box-shadow right-4 top-12 rounded w-4/12 min-w-min">
						<div className="flex p-1 m-2 items-center justify-between flex-nowrap ">
							<input
								type="text"
								className="flex-nowrap share-Universal text-left boredr-1 mr-2 share-like-input point min-w-min overflow-x-hidden w-full"
								placeholder="Add emails,people,integratons..."
							/>
							<button className="share-Universal button-bg">
								<p className="leading-5 text-white whitespace-nowra overflow-x-hidden">
									Invite
								</p>
							</button>
						</div>
						<hr />
						<div className="point">
							<div className="flex justify-between items-center py-3 px-2">
								<div className="flex items-center">
									<div className="px-3">
										<img src={globe} alt="showToWeb" className="w-7 h-7" />
									</div>
									<div>
										<p className="text-sm">Share to web</p>
										<p className="text-xs text-gray-500 overflow-x-hidden">
											Publish and share link with anyone
										</p>
									</div>
								</div>

								<label
									for="default-toggle"
									class="inline-flex relative items-center cursor-pointer"
								>
									<input
										type="checkbox"
										value=""
										id="default-toggle"
										class="sr-only peer"
										onClick={IsInvite1}
									/>
									<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
						{isInvite && <ShareLink />}

						<hr />

						<div>
							<div className="p-2 flex justify-between">
								<div className="flex items-center p-1 point">
									<img
										src={question}
										alt="shareHelp"
										className="w-3 h-3 mr-2 "
									/>
									<p className="text-xs text-gray-500">Learn about sharing</p>
								</div>
								<div className="flex items-center point p-1">
									<img src={link} alt="linkButton" className="w-4 h-4 mr-2" />
									<p className="text-xs overflow-x-hidden">Copy link</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
