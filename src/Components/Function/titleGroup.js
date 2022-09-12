import React from "react";
import axios from "axios";

export default function onEmojiClick(event, emojiObject, currentPageID) {
	const { type, id, value, className } = event.target;
	const baseUrl = process.env.REACT_APP_BASEURL;
	console.log(emojiObject);
	console.log(currentPageID);
	if (className === "emoji-img") {
		setPages((prevPages) => {
			return prevPages.map((item) => {
				return item.id === currentPageID
					? { ...item, icon: emojiObject.emoji }
					: item;
			});
		});
	}
	if (type === "text") {
		setPages((prevPages) => {
			return prevPages.map((item) => {
				// console.log(item);
				return item.id === id ? { ...item, title: value } : item;
			});
		});
	}
	// FIXME 把修改資料給put回去
	axios({
		method: "put",
		url: `${baseUrl}/pages/${currentPageID}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
		},
	});
}
