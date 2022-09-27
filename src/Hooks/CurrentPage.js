import React, { useContext, useState, useEffect } from "react";
import { usePages, usePagesUpdate } from "./Pages"
import { useParams } from "react-router-dom";

const CurrentPageContext = React.createContext();
const CurrentPageUpdateContext = React.createContext();

export function useCurrentPage() {
	return useContext(CurrentPageContext);
}

export function useCurrentPageUpdate() {
	return useContext(CurrentPageUpdateContext);
}

export function CurrentPageProvider({ children }) {
	const params = useParams()
	// const pages = usePages()
	const updatePages = usePagesUpdate()
	
	const [currentPage, setCurrentPage] = useState({});
	function changeCurrentPage(page) {
		// localStorage.setItem("currentPageId", page?.id)
		setCurrentPage(page);
		updatePages(prevPages => {
			return prevPages.map(prevPage =>{
				return prevPage.id === page.id ? page : prevPage
			})
		})
	}

	// useEffect(()=>{
	// 	// let currentPageId = ""
	// 	// if (params["page_id"] !== undefined || localStorage.getItem("currentPageId") !== undefined){

	// 	// 	currentPageId = params["page_id"] || localStorage.getItem("currentPageId") 
	// 	// }
	// 	// console.log(currentPageId)
	// 	// console.log(pages)
	// 	if (pages.length > 0 ){
	// 		const defaultCurrentPage = pages[0]
	// 		// console.log(defaultCurrentPage)
	// 		// console.log(currentPage)
	// 		changeCurrentPage(defaultCurrentPage);
	// 	}
	// }, [pages, params])

	return (
		<CurrentPageContext.Provider value={currentPage}>
			<CurrentPageUpdateContext.Provider value={changeCurrentPage}>
				{children}
			</CurrentPageUpdateContext.Provider>
		</CurrentPageContext.Provider>
	);
}
