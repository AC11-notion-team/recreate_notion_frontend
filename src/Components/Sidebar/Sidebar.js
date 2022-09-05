import React from "react";
import updata2 from "../image/updata2.png";
import setting from "../image/settings.png";
import Star from "./Star";
import Private from "./Private";
import Share from "./Share";
import Templates from "./Templates";
import Import from "./Import";
import Trash from "./Trash";
import User from "./User";
import QuickFind from "./QuickFind";
import newPage from "../image/plus.png";
import axios from "axios";
import addPage from "../image/plus.png";
import { useEffect, useState } from "react";

export default function Sidebar({ isFavorite, toggleFavorite, toggle }) {
	const [page, setPage] = useState([]);
	useEffect(() => {
		axios({
			method: "get",
			baseURL: "http://localhost:3001",
			url: "/api/v1/users/" + localStorage.getItem("zettelk_user_id"),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettelk_user_token"),
			},
		})
			.then((result) => {
				return JSON.stringify(result.data.pages);
			})
			.then((datas) => {
				let data = JSON.parse(datas);
				return data;
			})
			.then((data) => {
				setPage(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const addPage1 = () => {
		axios({
			method: "post",
			baseURL: "http://localhost:3001",
			url: "/api/v1/pages",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettelk_user_token"),
			},
		})
			.then((result) => {
				let datas = JSON.stringify(result.data.pages);
				let jsonData = JSON.parse(datas);
				setPage(jsonData);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<div className="relative inset-0 h-screen side-minW bg-gray-50 z-30">
			<User toggle={toggle} />
			<div className="mb-2 px-1 py-2">
				<QuickFind />

				<div className="flex items-center point py-1 px-3">
					<img src={updata2} alt="seach" className="w-5 h-5 p-0.5 mr-2" />
					<p className="text-sm font-semibold text-gray-600">Updates</p>
				</div>
				<div className="flex items-center point py-1 px-3">
					<img src={setting} alt="seach" className="w-5 h-5 p-0.5 mr-2" />
					<p className="text-sm font-semibold text-gray-600">
						Settings & members
					</p>
				</div>
			</div>
			<div className="h-3/4 overflow-x-hidden overflow-y-auto">
				<div className="mb-4">
					<Star state={isFavorite} toggle={toggleFavorite} />
				</div>
				<div className="mb-4">
					<Share />
				</div>
				<div className="mb-4">
					<div className="py-1 px-4 flex items-center justify-between point group px-1.5 py-1">
						<p className="text-xs font-semibold text-gray-500 point">PRIVATE</p>
						<button
							className="opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded w-5 h-5 p-1"
							data-aa="bb"
							onClick={addPage1}
						>
							<img src={addPage} alt="sidePageMoreButton" />
						</button>
					</div>

					<Private page={page} />
				</div>
				<div className="px-1 py-2">
					<Templates />
					<Import />
					<Trash />
				</div>
			</div>
			<div className="w-full bottom-0 flex items-center py-3 px-2 shadow-inner point mt-auto">
				<img className="w-5 h-5 p-0.5 mr-2" src={newPage} alt="newPage" />
				<p className="text-sm font-semibold text-gray-600">New page</p>
			</div>
		</div>
	);
}
