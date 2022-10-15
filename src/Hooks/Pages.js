import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const PagesContext = React.createContext();
const PagesUpdateContext = React.createContext();
const HandlePageUpdateContext = React.createContext();

export function usePages() {
	return useContext(PagesContext);
}

export function usePagesUpdate() {
	return useContext(PagesUpdateContext);
}

export function useHandlePageUpdate() {
	return useContext(HandlePageUpdateContext);
}

export function PagesProvider({ children }) {
	const [pages, setPages] = useState([]);
	const baseUrl = process.env.REACT_APP_BASEURL;
	const token = `Bearer ${localStorage.getItem("zettel_user_token") || null}`;

	function changePages(pages) {
		setPages(pages);
	}

	function handlePageUpdate(page){
		page.id && setPages(prevPages =>{
			return prevPages.map(prevPage =>{
				return prevPage.id === page.id 
					?	page
					:	prevPage
			})
		})
		axios({
			method: "put",
			url: `${baseUrl}/pages/${page.id}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			data: page
		});
	}

	useEffect(() => {
		axios({
			method: "get",
			url: `${baseUrl}/users/${localStorage.getItem("zettel_user_id")}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		}).then((response)=>{
			changePages(response?.data?.pages);
		}).catch(error => console.error(error))
	}, [baseUrl, token]);

	return (
		<PagesContext.Provider value={pages}>
			<PagesUpdateContext.Provider value={changePages}>
				<HandlePageUpdateContext.Provider value = {handlePageUpdate}>
					{children}
				</HandlePageUpdateContext.Provider>
			</PagesUpdateContext.Provider>
		</PagesContext.Provider>
	);
}
