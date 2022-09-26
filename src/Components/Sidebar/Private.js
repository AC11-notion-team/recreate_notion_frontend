import React, { useEffect, useMemo,useCallback } from "react";
import Page from "./Page";
import axios from "axios";
import { usePages, usePagesUpdate } from "../../Hooks/Pages";
import { useCurrentPageUpdate } from "../../Hooks/CurrentPage";
import { useParams } from "react-router-dom";

function Private({ onEmojiClick,toggleFavorite }) {
	const pages = usePages();
	const changePages = usePagesUpdate();
	const changeCurrentPage = useCurrentPageUpdate();
	const baseUrl = process.env.REACT_APP_BASEURL;
	const params = useParams();
	const handleChangeCurrentPage = (page) => {
		console.log(page)
		changeCurrentPage(page)
	}
	console.log(pages)
	useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: "get",
					url: `${baseUrl}/users/${localStorage.getItem("zettel_user_id")}`,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"zettel_user_token"
						)}`,
					},
				});
				if (response){
					console.log(response)
					changePages(response.data.pages);
					const currentPageId = params["page_id"] || localStorage.getItem("currentPageId") || response.data.pages[0].id
					const currentPage = response.data.pages.filter(item => item.id === currentPageId)[0]
					changeCurrentPage(currentPage);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="px-1 py-1">
			{pages.map((page) => (
				<Page
					key={page.id}
					handleChangeCurrentPage = {() => handleChangeCurrentPage(page)}
					onEmojiClick={onEmojiClick}
					pageTitle={page.title}
					pageIcon={page.icon}
					pageID={page.id}
					page={page}
					pageFavorite={page.favorite}
					toggleFavorite ={toggleFavorite}
				/>
			))}
		</div>
	);
}
export default React.memo(Private)