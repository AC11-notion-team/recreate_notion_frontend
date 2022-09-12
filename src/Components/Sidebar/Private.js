import React, { useEffect } from "react";
// import PageList from "./PageList";
import Page from "./Page";
import axios from "axios";
import { usePages, usePagesUpdate } from "../../Pages";

export default function Private({ onEmojiClick }) {
	const pages = usePages();
	const changePages = usePagesUpdate();
	const baseUrl = process.env.REACT_APP_BASEURL;
	console.log(pages);
	useEffect(() => {
		console.log(123);
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
				await changePages(response.data.pages);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

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
