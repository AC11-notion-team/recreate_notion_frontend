import React, { useState, useLayoutEffect, useCallback } from "react";
import "./App.css";
import Editor from "./Components/Editor/Editor";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Split from "split.js";
import axios from "axios";
import { usePagesUpdate, usePages } from "./Hooks/Pages";
import PageHeader from "./Components/PageHeader/PageHeader.js";
import { WsReceivedProvider } from "./Hooks/useActionCable";

function App() {
	const changePages = usePagesUpdate();
	const baseUrl = process.env.REACT_APP_BASEURL;
	// 控制sidebar 出現跟消失
	const [isSide, setIsSide] = useState(true);
	const toggleSide = useCallback(() => setIsSide((prevSide) => !prevSide), []);
	//我的最愛
	const [isFavorite, setIsFavorite] = useState(false);
	const token = `Bearer ${localStorage.getItem("zettel_user_token")}`

	const toggleFavorite = useCallback((currentPageID, pageID) => {
		const currentIsFavorite = !isFavorite
		setIsFavorite((prevIsFavorite) => !prevIsFavorite);
		axios({
			method: "put",
			url: `${baseUrl}/pages/${currentPageID}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			data: {
				favorite: currentIsFavorite,
			},
		}).then((res) => {
			changePages((prevPages) => {
				return prevPages.map((item) => {
					if (pageID) {
						return item.id === pageID
							? { ...item, favorite: currentIsFavorite }
							: item;
					} else {
						return item.id === currentPageID
							? { ...item, favorite: currentIsFavorite }
							: item;
					}
				});
			});
		});
	}, [baseUrl, changePages, isFavorite, token]);

	//  側邊欄拖拉
	useLayoutEffect(() => {
		if (isSide) {
			Split(["#split-0", "#split-1"], {
				sizes: [20, 80],
				maxSize: [500, Infinity],
				minSize: [200, 200],
				gutterSize: 2,
				dragInterval: 2,
				gutterAlign: "start",
			});
		}
	}, [isSide]);

	const onEmojiClick = useCallback((event, currentPageID, pageID, emojiObject) => {
		const { type, value, className } = event.target;
		console.log("EmojiClick")
		if (className === "emoji-img") {
			changePages((prevPages) => {
				return prevPages.map((item) => {
					if (pageID) {
						return item.id === pageID
							? { ...item, icon: emojiObject.emoji }
							: item;
					} else {
						return item.id === currentPageID
							? { ...item, icon: emojiObject.emoji }
							: item;
					}
				});
			});
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageID}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				data: {
					icon: emojiObject.emoji,
				},
			});
		}
		if (type === "text") {
			changePages((prevPages) => {
				return prevPages.map((item) => {
					if (pageID) {
						return item.id === pageID ? { ...item, title: value } : item;
					} else {
						return item.id === currentPageID ? { ...item, title: value } : item;
					}
				});
			});
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageID}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				data: {
					title: value,
				},
			});
		}
	},[baseUrl, changePages, token]);

	return (
		<div>
			<div className="flex w-full h-screen split">
				{isSide && (
					<div id="split-0" className="relative flex-grow-0 side-minW">
						<Sidebar
							toggleFavorite={toggleFavorite}
							toggle={toggleSide}
							onEmojiClick={onEmojiClick}
						/>
					</div>
				)}

				<div id="split-1" className="flex-grow overflow-hidden">
					<Header
						toggleFavorite={toggleFavorite}
						isSide={isSide}
						toggleSide={toggleSide}
						onEmojiClick={onEmojiClick}
					/>
					<div className="relative overflow-auto content ">
						<PageHeader onEmojiClick={onEmojiClick} />
						<Editor />
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
