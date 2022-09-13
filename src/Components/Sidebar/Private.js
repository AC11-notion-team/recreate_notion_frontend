import React, { useEffect } from "react";
import Page from "./Page";
import axios from "axios";
import { usePages, usePagesUpdate } from "../../Pages";
import {useCurrentPageUpdateId } from "../../CurrentPageId";

export default function Private({ onEmojiClick }) {
	const pages = usePages();
	const changePages = usePagesUpdate();
	const changeCurrentPageId = useCurrentPageUpdateId()
	const baseUrl = process.env.REACT_APP_BASEURL;

	useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: "get",
					url: `${baseUrl}/users/${localStorage.getItem("zettel_user_id")}`,
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer " + localStorage.getItem("zettel_user_token"),
					},
				});
			 changePages(response.data.pages);
			 changeCurrentPageId(response.data.pages[0].id)
			} catch (error) {
				console.log(error);
			}
		})();
	}, [baseUrl, changeCurrentPageId, changePages]);
	
	const page = pages.map((item) => {
		return (
			<Page
				onEmojiClick={onEmojiClick}
				pageTitle={item.title}
				pageIcon={item.icon}
				pageID={item.id}
			/>
		);
	});
	return <div className="py-1 px-1">{page}</div>;
}
