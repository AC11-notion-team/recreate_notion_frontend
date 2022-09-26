import React, { useContext, useState, useEffect } from "react";
import { useCurrentPageUpdate } from "./CurrentPage";
import { useParams } from "react-router-dom";
import axios from "axios";

const PagesContext = React.createContext();
const PagesUpdateContext = React.createContext();

export function usePages() {
	return useContext(PagesContext);
}

export function usePagesUpdate() {
	return useContext(PagesUpdateContext);
}

export function PagesProvider({ children }) {
	const [pages, setPages] = useState([]);
	const baseUrl = process.env.REACT_APP_BASEURL;
	const changeCurrentPage = useCurrentPageUpdate();
	const params = useParams();
	function changePages(pages) {
		setPages(pages);
	}
	
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
				if (response){
					console.log(response)
					changePages(response.data.pages);
					const currentPageId = params["page_id"] || localStorage.getItem("currentPageId") || response.data.pages[0].id
					const currentPage = response.data.pages.filter(item => item.id === currentPageId)[0]
					changeCurrentPage(currentPage);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	return (
		<PagesContext.Provider value={pages}>
			<PagesUpdateContext.Provider value={changePages}>
				{children}
			</PagesUpdateContext.Provider>
		</PagesContext.Provider>
	);
}
