import React, { useContext, useState, useEffect, useMemo } from "react";
import { useCurrentPageUpdate } from "./CurrentPage";

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
	function changePages(pages) {
		setPages(pages);
	}
	
	useMemo(() => {
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
					changePages(response.data.pages);
					
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [baseUrl]);
	return (
		<PagesContext.Provider value={pages}>
			<PagesUpdateContext.Provider value={changePages}>
				{children}
			</PagesUpdateContext.Provider>
		</PagesContext.Provider>
	);
}
