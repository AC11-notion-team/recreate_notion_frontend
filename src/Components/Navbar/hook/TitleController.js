// import { usePages, usePagesUpdate } from "../../../Pages";
// import {
// 	useCurrentPageId,
// 	useCurrentPageUpdateId,
// } from "../../../CurrentPageId";
// import axios from "axios";

// function useOnEmojiClick(event, currentPageId, emojiObject) {
// 	const pages = usePages();
// 	const changePages = usePagesUpdate();
// 	const currentPageId = useCurrentPageId();
// 	const changeCurrentPageId = useCurrentPageUpdateId();
// 	const baseUrl = process.env.REACT_APP_BASEURL;
// 	const { type, id, value, className } = event.target;
// 	console.log(123);
// 	console.log(emojiObject);
// 	console.log(currentPageId);
// 	if (className === "emoji-img") {
// 		changePages((prevPages) => {
// 			return prevPages.map((item) => {
// 				return item.id === currentPageId
// 					? { ...item, icon: emojiObject.emoji }
// 					: item;
// 			});
// 		});
// 	}
// 	if (type === "text") {
// 		changePages((prevPages) => {
// 			return prevPages.map((item) => {
// 				// console.log(item);
// 				return item.id === id ? { ...item, title: value } : item;
// 			});
// 		});
// 	}
// 	//  把修改資料給put回去
// 	axios({
// 		method: "put",
// 		url: `${baseUrl}/pages/${currentPageId}`,
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
// 		},
// 	});
// }

// export default useOnEmojiClick;
