import React, { useEffect, useState } from "react";
import globe from "../../image/globe.png";
import ActionButton from "../ActionButton";
import ShareLink from "./component/ShareLink";
import ShareToParticularPerson from "./component/ShareToParticularPerson";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { useCurrentPageId } from "../../../Hooks/CurrentPageId";
import { useDetectClickOutside } from "react-detect-click-outside";

export default React.memo(function Share() {
	const domainUrl = process.env.REACT_APP_DOMAINURL;
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isShare, setIsShare] = useState(() => false);
	const currentPageId = useCurrentPageId();
	const handleToggle = (e) => {
		setIsShare((prevShare) => {
			return !prevShare
		});
	};
	const [editable, setEditable] = useState([false, false]);
	const shareRef = useDetectClickOutside({
		onTriggered: () => {
			setIsShare(false)
		},
		allowAnyKey: false,
	});
	const inviteUrl = `${domainUrl}/app/${currentPageId}`;
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
					Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
				},
				params: {
					state: state,
				},
			}).catch((err) => {
				console.error(err);
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
		<div ref={shareRef} className="flex items-center">
			<ActionButton
				className="IsShare"
				handleClick={handleToggle}
				content="Share"
			/>

			{isShare && (
				<div  className="absolute w-5/12 bg-white border-2 rounded z-20 box-shadow right-4 top-12 min-w-min">
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
										editable[0] ? "button-bg" : "bg-gray-200"
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

				</div>
			)}
		</div>
	);
})
