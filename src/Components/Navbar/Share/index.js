import React, { useEffect, useState } from "react";
import globe from "../../image/globe.png";
import MenuButton from "../Share/../MenuButton";
import ShareLink from "./component/ShareLink";
import ShareToParticularPerson from "./component/ShareToParticularPerson";
import LearnMore from "./component/LearnMore";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { useCurrentPageId } from "../../../CurrentPageId";

export default function Share({ currentPageID }) {
	const domainUrl = process.env.REACT_APP_DOMAINURL;
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isShare, setIsShare] = useState(false);
	const currentPageId = useCurrentPageId();
	const handleToggle = (e) => {
		if (e.target.className.includes("IsShare") === true) {
			setIsShare((prevShare) => !prevShare);
		}
	};
	const [editable, setEditable] = useState([false, false]);

	const inviteUrl = `${domainUrl}/${currentPageId}`;
	useEffect(() => {
		if (currentPageId) {
			axios({
				method: "get",
				url: `${baseUrl}/pages/${currentPageId}.json`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
				},
			}).then((res) => {
				const editList = {
					null: [false, false],
					true: [true, true],
					false: [true, false],
				};
				setEditable(editList[res.data.editable]);
			});
		}
	}, [currentPageId]);
	useEffect(() => {
		let state = "";
		if (!editable[0]) {
			state = null;
		} else if (editable[1]) {
			state = true;
		} else {
			state = false;
		}
		if (currentPageId) {
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageId}/editable`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
				},
				params: {
					state: state,
				},
			}).catch((err) => {
				console.log(err);
			});
		}
	}, [editable]);

	const handleEditable = () => {
		let invite = editable[0];
		let edi = editable[1];
		setEditable([invite, !edi]);
	};
	const handleShare = () => {
		let invite = editable[0];
		let edi = editable[1];
		setEditable([!invite, edi]);
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
					className="fixed top-0 bottom-0 left-0 z-20 w-screen IsShare"
				>
					<div className="absolute w-4/12 bg-white border-2 rounded box-shadow right-4 top-12 min-w-min">
						<ShareToParticularPerson />
						<hr />
						<div className="point">
							<div className="flex items-center justify-between px-2 py-3">
								<div className="flex items-center">
									<div className="px-3">
										<img src={globe} alt="showToWeb" className="w-7 h-7" />
									</div>
									<div>
										<p className="text-sm">Share to web</p>
										<p className="overflow-x-hidden text-xs text-gray-500">
											Publish and share link with anyone
										</p>
									</div>
								</div>

								<Switch
									checked={editable[0]}
									onChange={handleShare}
									className={`${
										editable[0] ? "bg-blue-600" : "bg-gray-200"
									} relative inline-flex h-6 w-11 items-center rounded-full`}
								>
									<span className="sr-only">Enable notifications</span>
									<span
										className={`${
											editable[0] ? "translate-x-6" : "translate-x-1"
										} inline-block h-4 w-4 transform rounded-full bg-white transition`}
									/>
								</Switch>
							</div>
						</div>
						{editable[0] && (
							<ShareLink
								inviteUrl={inviteUrl}
								editable={editable}
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
