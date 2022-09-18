import React, { useState } from "react";
import more from "../image/more.png";
import trash from "../image/delete.png";
import star from "../image/empty-star.png";
import link from "../image/link.png";
import right from "../image/forward.png";
import question from "../image/question.png";
import ActionButton from "../Navbar/ActionButton";
import duplicate from "../image/duplicate.png";
import Rename from "./Rename";
import { useDetectClickOutside } from "react-detect-click-outside";
import axios from "axios";
import { usePagesUpdate } from "../../Pages";
import { useCurrentPageUpdateId } from "../../CurrentPageId";


export default function PageMore({
	closeDropdown,
	onEmojiClick,
	pageTitle,
	pageIcon,
	pageID,
}) {
	const [isPageMore, setIsPageMore] = useState(false);
	const baseUrl = process.env.REACT_APP_BASEURL;

	const changePages = usePagesUpdate();
	const changeCurrentPageId = useCurrentPageUpdateId();

	const handleToggle = () => {
		setIsPageMore((prevPageMore) => !prevPageMore);
	};

	const ref = useDetectClickOutside({
		onTriggered: closeDropdown,
		allowAnyKey: false,
	});
	let prevId =""
	const removePage = () => {
		axios({
			method: "delete",
			url: `${baseUrl}/pages/${pageID}/delete_page`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		}).then((res) => {
			changePages((prevPages) => {
				return prevPages.filter((item) => {
					if(item.id !== pageID){
						prevId = item.id
					}else{
						changeCurrentPageId(prevId)
					}
					return item.id !== pageID
					
				});
			});
		})
	};

	return (
		<div ref={ref}>
			<div onClick={handleToggle}>
				<button
					className="w-5 h-5 p-1 hidden group-hover:inline-block hover:bg-gray-300 hover:rounded"
					data-aa="aa"
				>
					<img src={more} alt="sidePageMoreButton" className="w-full h-full" />
				</button>
			</div>
			{isPageMore && (
				<div className="fixed z-10 bg-white border rounded box-shadow w-60 ">
					<div className="p-1.5">
						<ActionButton
							src={trash}
							alt="delete"
							content="Delete"
							className="py-0.5"
							handleClick={removePage}
						/>
						<ActionButton
							src={star}
							alt="Favorite"
							content="Add to Favorites"
							className="py-0.5"
						/>
						<ActionButton
							src={duplicate}
							alt="duplicate"
							content="Duplicate"
							className="py-0.5"
						/>
						<ActionButton
							src={link}
							alt="link"
							content="Copy link"
							className="py-0.5"
						/>
						<Rename
							pageTitle={pageTitle}
							pageIcon={pageIcon}
							pageID={pageID}
							onEmojiClick={onEmojiClick}
							handlePageMore={handleToggle}
						/>
					</div>
					<hr />
					{/* <div className="p-2">
						<ActionButton src={right} alt="moveTo" content="Move to" />
					</div>
					<hr />
					<div className="p-2">
						<div className="my-2">
							<p className="px-1 text-xs text-gray-500">Last edited by user</p>
							<p className="px-1 text-xs text-gray-500">Today at 9:40 PM</p>
						</div>
					</div>
					<hr />
					<ActionButton
						src={question}
						alt="learnAbout"
						illustrate="Learn about databases"
						className="py-1 px-0.5"
					/> */}
				</div>
			)}
		</div>
	);
}
