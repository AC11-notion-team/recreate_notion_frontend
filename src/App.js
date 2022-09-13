import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import Editor from "./Components/Editor";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Split from "split.js";
import axios from "axios";
import { usePagesUpdate } from "./Pages";

function App() {
	const changePages = usePagesUpdate();

	const baseUrl = process.env.REACT_APP_BASEURL;
	// 控制sidebar 出現跟消失
	const [isSide, setIsSide] = useState(true);
	// const [currentPageID, setcurrentPageID] = useState("");
	//我的最愛
	const [isFavorite, setIsFavorite] = useState(false);
	// 控制sidebar 出現跟消失
	const toggleSide = () => setIsSide((prevSide) => !prevSide);

	//我的最愛
	const toggleFavorite = () =>
		setIsFavorite((prevIsFavorite) => !prevIsFavorite);
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


	const onEmojiClick = (event, currentPageID, emojiObject) => {
		const { type, id, value, className } = event.target;
		if (className === "emoji-img") {
			changePages((prevPages) => {
				return prevPages.map((item) => {
					return item.id === currentPageID
						? { ...item, icon: emojiObject.emoji }
						: item;
				});
			});
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageID}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
				},
				data:{
					"icon":  `${emojiObject.emoji}`
				}	
			});
		}
		if (type === "text") {
			changePages((prevPages) => {
				return prevPages.map((item) => {
					// console.log(item);
					return item.id === id ? { ...item, title: value } : item;
				});
			});
			axios({
				method: "put",
				url: `${baseUrl}/pages/${currentPageID}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
				},
				data:{
					"title": `${value}`,
				}	
			});
		}	
	};

	return (
		<div>
			<div className="split h-screen w-full flex">
				{isSide && (
					<div id="split-0" className="relative side-minW flex-grow-0">
						<Sidebar
							isFavorite={isFavorite}
							toggleFavorite={toggleFavorite}
							toggle={toggleSide}
							onEmojiClick={onEmojiClick}
						/>
					</div>
				)}

				<div id="split-1" className="flex-grow overflow-hidden">
					<Header
						isFavorite={isFavorite}
						toggleFavorite={toggleFavorite}
						isSide={isSide}
						toggleSide={toggleSide}
						onEmojiClick={onEmojiClick}
					/>
					{/* < PageHeader /> */}
					<Editor />
					{/* <Calendar /> */}
				</div>
			</div>
		</div>
	);
}
export default App;
