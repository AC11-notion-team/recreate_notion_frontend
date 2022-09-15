import React, { useEffect, useState } from "react";
import globe from "../../image/globe.png";
import MenuButton from "../MenuButton";
import ShareLink from "./component/ShareLink";
import ShareToParticularPerson from "./component/ShareToParticularPerson";
import LearnMore from "./component/LearnMore";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { useCurrentPageId } from "../../../CurrentPageId";

export default function Share() {
	const domainUrl = process.env.REACT_APP_DOMAINURL;
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isShare, setIsShare] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const currentPageId = useCurrentPageId();
	const handleToggle = (e) => {
		if (e.target.className.includes("IsShare") === true) {
			setIsShare((prevShare) => !prevShare);
		}
	};
	const [isInvite, setIsInvite] = useState(true);

	const inviteUrl = `${domainUrl}/page/${currentPageId}`;
	useEffect(() => {
		if (currentPageId) {
			axios({
				method: "get",
				url: `${baseUrl}/pages/${currentPageId}.json`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
				},
			}).then((res) => {
				setIsInvite(res.data.share);
				setIsEditable(res.data.editable);
			});
		}
	}, [baseUrl, currentPageId, isShare]);
	useEffect(() => {
		if (currentPageId) {
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageId}/share`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
				},
			});
		}
	}, [baseUrl, currentPageId, isInvite]);
	useEffect(() => {
		if (currentPageId) {
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageId}/editable`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
				},
			});
		}
	}, [baseUrl, currentPageId, isEditable]);
	const handleEditable = () => {
		setIsEditable((prevIsEditable) => !prevIsEditable);
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
						<ShareToParticularPerson />
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

								<Switch
									checked={isInvite}
									onChange={setIsInvite}
									className={`${
										isInvite ? "button-bg" : "bg-gray-200"
									} relative inline-flex h-6 w-11 items-center rounded-full`}
								>
									<span className="sr-only">Enable notifications</span>
									<span
										className={`${
											isInvite ? "translate-x-6" : "translate-x-1"
										} inline-block h-4 w-4 transform rounded-full bg-white transition`}
									/>
								</Switch>
							</div>
						</div>
						{isInvite && (
							<ShareLink
								inviteUrl={inviteUrl}
								isEditable={isEditable}
								handleEditable={handleEditable}
							/>
						)}

						<hr />
						<LearnMore />
					</div>
				</div>
			)}
		</div>
	);
}
