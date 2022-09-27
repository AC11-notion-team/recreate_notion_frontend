import React, { useState } from "react";
import more from "../image/more.png";
import trash from "../image/delete.png";
import emptyStar from "../image/empty-star.png";
import fullStar from "../image/full-star.png";
import ActionButton from "../Navbar/ActionButton";
import Rename from "./Rename";
import { useDetectClickOutside } from "react-detect-click-outside";
import axios from "axios";
import { usePagesUpdate } from "../../Hooks/Pages";
import { useCurrentPageUpdate } from "../../Hooks/CurrentPage";
import {useTrashPagesUpdate} from "../../Hooks/TrashPages"


export default function PageMore({ page }) {
	const [isPageMore, setIsPageMore] = useState(false);
	const baseUrl = process.env.REACT_APP_BASEURL;
	const changePages = usePagesUpdate();
	const changeTrashPages = useTrashPagesUpdate()
	const {id: pageID, favorite: pageFavorite} = page
	
	const handleFavorite = () => {
		changePages(prevPages =>{
			return prevPages.map(prevPage =>{
				return prevPage.id === page.id 
					?	{...page, favorite: !page.favorite}
					:	prevPage
			})
		})
	}

	const handleToggle = () => {
		setIsPageMore((prevPageMore) => !prevPageMore);
	};

	const closeDropdown = ()=>setIsPageMore(false)
	const ref = useDetectClickOutside({
		onTriggered: closeDropdown,
		allowAnyKey: false,
	});
	
	const removePage = () => {
		axios({
			method: "delete",
			url: `${baseUrl}/pages/${pageID}/delete_page`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		}).then((res) => {
			// changePages((prevPages) => {
			// 	return prevPages.filter((item) => {
			// 		if(item.id !== pageID){
			// 			prevId = item.id
			// 		}else{
			// 			changeCurrentPageId(prevId)
			// 		}
			// 		return item.id !== pageID
					
			// 	});
			// });
			changeTrashPages(prevTrahsPages =>{
				return [...prevTrahsPages,res.data]
			})
		})
	};

	return (
		<div ref={ref} onMouseLeave = {closeDropdown}>
			<div onClick={handleToggle}>
				<button
					className="w-5 h-5 p-1 hidden group-hover:inline-block hover:bg-gray-300 hover:rounded "
					data-aa="aa"
				>
					<img src={more} alt="sidePageMoreButton" className="w-full h-full" />
					
				</button>
			</div>
			{isPageMore && <div className="absolute bg-white border rounded box-shadow w-60 z-50">
				<div className="p-1.5">
					<ActionButton
						src={trash}
						alt="delete"
						content="Delete"
						// handleClick={removePage}
						className="py-1"
					/>
					<ActionButton
						src={pageFavorite ? fullStar : emptyStar}
						alt="Favorite"
						content={pageFavorite ? "Remove from Favorites":"Add to Favorites"} 
						className="py-1"
						handleClick={handleFavorite}
					/>
					<Rename
						page = {page}
						handleMore={handleToggle}
					/>
				</div>
			</div>}
		</div>
	);
}
