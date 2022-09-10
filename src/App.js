import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import Editor from "./Components/Editor";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Split from "split.js";
import axios from "axios";
// import Calendar from './Components/Calendar/Calendar';

function App() {
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isSide, setIsSide] = useState(true);
	const toggleSide = () => setIsSide((prevSide) => !prevSide);
	const [currentPageID, setcurrentPageID] = useState("");
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

	const [isFavorite, setIsFavorite] = useState(false);
	const toggleFavorite = () =>
		setIsFavorite((prevIsFavorite) => !prevIsFavorite);

	const [titleGroup, setTitleGroup] = useState({
		icon: null,
		title: "Untitled",
	});

	const [pages, setPages] = useState([]);
	useEffect(() => {
		axios({
			method: "get",
			url: `${baseUrl}/users/${localStorage.getItem("zettel_user_id")}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		})
			.then((result) => {
				return JSON.stringify(result.data.pages);
			})
			.then((datas) => {
				let data = JSON.parse(datas);
				setcurrentPageID(data[0]["id"]);

				return data;
			})
			.then((data) => {
				setPages(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const onEmojiClick = (event, emojiObject, currentPageID) => {
		const { type, id, value, className } = event.target;
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
		axios({
			method: "put",
			url: `${baseUrl}/pages/${currentPageID}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		});
	};

	axios({
		method: "put",
		url: `${baseUrl}/pages/${currentPageID}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
		},
	});

	const addPage1 = () => {
		axios({
			method: "post",
			url: `${baseUrl}/pages`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		})
			.then((result) => {
				let data = JSON.stringify(result.data);
				let jsonData = JSON.parse(data);
				setPages((prevPages) => {
					return [...prevPages, jsonData];
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// click and set page_id

	const handlePageID = (pageID) => {
		setcurrentPageID(pageID);
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
							pages={pages}
							addPage1={addPage1}
							handlePageID={handlePageID}
							currentPageID={currentPageID}
						/>
					</div>
				)}

				<div id="split-1" className="flex-grow overflow-hidden">
					<Header
						isFavorite={isFavorite}
						toggleFavorite={toggleFavorite}
						isSide={isSide}
						toggleSide={toggleSide}
						pages={pages}
						onEmojiClick={onEmojiClick}
						currentPageID={currentPageID}
					/>
					{/* < PageHeader /> */}
					<Editor currentPageID={currentPageID} />
					{/* <Calendar /> */}
				</div>
			</div>
		</div>
	);
}
export default App;
