import React, { useCallback } from "react";
import FavoritePage from "./FavoritePage";
import Private from "./Private";
import Share from "./Share";
import Trash from "./Trash";
import User from "./User";
import QuickFind from "./QuickFind";
import addPage from "../image/plus.png";
import axios from "axios";
import { usePagesUpdate } from "../../Hooks/Pages";

export default function Sidebar({toggleSide}) {
	const changePages = usePagesUpdate();
	const baseUrl = process.env.REACT_APP_BASEURL;

	const addPage1 = useCallback(() => {
		//  負責加page的
		axios({
			method: "post",
			url: `${baseUrl}/pages`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
			},
		})
			.then((result) => {
				let data = JSON.stringify(result.data);
				let jsonData = JSON.parse(data);
				changePages((prevPages) => {
					return [...prevPages, jsonData];
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<div className="absolute inset-0 h-screen side-minW bg-gray-100">
			<User toggleSide={toggleSide} />
			<div className="mb-2 px-1 py-2">
				<QuickFind />
			</div>
			<div className="h-3/4 overflow-x-hidden overflow-y-auto">
				<div className="mb-4">
					<FavoritePage />
				</div>
				<div className="mb-4">
					<Share />
				</div>
				<div className="mb-4">
					<div className="flex items-center justify-between point group py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">PRIVATE</p>
						<button
							className="opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded w-5 h-5 p-1"
							data-aa="bb"
							onClick={() => addPage1()}
						>
							<img src={addPage} alt="sidePageMoreButton" />
						</button>
					</div>

					<Private/>
				</div>
				<div className="px-1 py-2">
					<Trash />
				</div>
			</div>
			<div className="absolute w-full bottom-0 flex items-center py-3 px-2 shadow-inner point mt-auto" 
				data-aa="bb"
				onClick={() => addPage1()}>
				<img className="w-5 h-5 p-0.5 mr-2" src={addPage} alt="newPage" />
				<p className="text-sm font-semibold text-gray-600">New page</p>
			</div>
		</div>
	);
}
