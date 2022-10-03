import React, { useContext, useState, useMemo } from "react";

import axios from "axios";

const PagesContext = React.createContext();
const PagesUpdateContext = React.createContext();
const HandlePageUpdateContext = React.createContext();
const HandlePagesTitleContext = React.createContext();

export function usePages() {
	return useContext(PagesContext);
}

export function usePagesUpdate() {
	return useContext(PagesUpdateContext);
}

export function useHandlePageUpdate() {
	return useContext(HandlePageUpdateContext);
}

export function useHandlePagesTitle() {
	return useContext(HandlePagesTitleContext);
}

export function PagesProvider({ children }) {
	const [pages, setPages] = useState([]);
	const baseUrl = process.env.REACT_APP_BASEURL;
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
	}

	function handlePagesTitle(page, newTitle){
		changePages(prevPages =>{
			return prevPages.map(prevPage =>{
				return prevPage.id === page.id 
					?	{...prevPage, title: newTitle}
					:	prevPage
			})
		})
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
				<HandlePageUpdateContext.Provider value = {handlePageUpdate}>
					<HandlePagesTitleContext.Provider value = {handlePagesTitle}>
						{children}
					</HandlePagesTitleContext.Provider>
				</HandlePageUpdateContext.Provider>
			</PagesUpdateContext.Provider>
		</PagesContext.Provider>
	);
}
