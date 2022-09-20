import React, { useEffect } from "react";
import Page from "./Page";
import axios from "axios";
import { usePages, usePagesUpdate } from "../../Hooks/Pages";
import { useCurrentPageUpdateId } from "../../Hooks/CurrentPageId";
import { useParams } from "react-router-dom";

export default function Private({ onEmojiClick }) {
	const pages = usePages();
	const changePages = usePagesUpdate();
	const changeCurrentPageId = useCurrentPageUpdateId();
	const baseUrl = process.env.REACT_APP_BASEURL;
	const params = useParams();

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
				console.log(response)
				changePages(response.data.pages);
				changeCurrentPageId(params["page_id"] || localStorage.getItem("currentPageId") || response.data.pages[0].id);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div className="px-1 py-1">
			{pages.map((item, i) => (
				<Page
					key={item.id}
					onEmojiClick={onEmojiClick}
					pageTitle={item.title}
					pageIcon={item.icon}
					pageID={item.id}
					pageFavorite={item.id}
				/>
			))}
		</div>
	);
}
