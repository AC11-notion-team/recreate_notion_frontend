import React, { useContext, useState, useEffect } from "react";
import { usePages } from "./Pages"
import { useParams } from "react-router-dom";

const CurrentPageContext = React.createContext();
const CurrentPageUpdateContext = React.createContext();
const CurrentPageChangeContext = React.createContext();
export function useCurrentPage() {
	return useContext(CurrentPageContext);
}

export function useCurrentPageUpdate() {
	return useContext(CurrentPageUpdateContext);
}

export function useCurrentPageChange(){
	return useContext(CurrentPageChangeContext);
}

export function CurrentPageProvider({ children }) {
	const params = useParams()
	const pages = usePages()
	const [currentPage, setCurrentPage] = useState({});

	function updateCurrentPage(page) {
		setCurrentPage(page);
	}

	function changeCurrentPage(page){
		if(page){
			localStorage.setItem("currentPageId", page.id)
			setCurrentPage(page);
		}
	}

	useEffect(()=>{
		if (pages.length > 0 ){
			const currentPageId = params["page_id"] || localStorage.getItem("currentPageId") || pages?.[0].id
			const currentPage = pages.filter(page => page.id === currentPageId)?.[0]
			currentPage && changeCurrentPage(currentPage);
		}
	}, [pages, params])

	return (
		<CurrentPageContext.Provider value={currentPage}>
			<CurrentPageUpdateContext.Provider value={updateCurrentPage}>
				<CurrentPageChangeContext.Provider value={changeCurrentPage}>
					{children}
				</CurrentPageChangeContext.Provider>
			</CurrentPageUpdateContext.Provider>
		</CurrentPageContext.Provider>
	);
}
