import React, { useState } from "react";
import more from "../image/more.png";
import trash from "../image/delete.png";
import star from "../image/empty-star.png";
import link from "../image/link.png";
import ActionButton from "../Navbar/ActionButton";
import duplicate from "../image/duplicate.png";
import Rename from "./Rename";
import { useDetectClickOutside } from "react-detect-click-outside";
import axios from "axios";
import { usePagesUpdate } from "../../Pages";
import { useCurrentPageUpdateId } from "../../CurrentPageId";
import {useTrashPagesUpdate} from "../../TrashPages"


export default function PageMore({
	closeDropdown,
	onEmojiClick,
	pageTitle,
	pageIcon,
	pageID
}) {
	const [isPageMore, setIsPageMore] = useState(false);
	const baseUrl = process.env.REACT_APP_BASEURL;
	const changePages = usePagesUpdate();
	const changeCurrentPageId = useCurrentPageUpdateId();
	const changeTrashPages = useTrashPagesUpdate()
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
			changeTrashPages(prevTrahsPages =>{
				return [...prevTrahsPages,res.data]
			})
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
							handleClick={removePage}
							className="py-1"
						/>
						<ActionButton
							src={star}
							alt="Favorite"
							content="Add to Favorites"
							className="py-1"
						/>
						<ActionButton
							src={duplicate}
							alt="duplicate"
							content="Duplicate"
							className="py-1"
						/>
						<ActionButton
							src={link}
							alt="link"
							content="Copy link"
							className="py-1"
						/>
						<Rename
							pageTitle={pageTitle}
							pageIcon={pageIcon}
							pageID={pageID}
							onEmojiClick={onEmojiClick}
							handlePageMore={handleToggle}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
