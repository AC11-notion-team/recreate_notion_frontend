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
	const newCurrentPage = pages.filter(page => page.id === currentPage.id)[0]

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
	}, [])

	useEffect(()=>{
		if(currentPage && newCurrentPage){
			!deepEqual(newCurrentPage, currentPage) && setCurrentPage(newCurrentPage)
		}
	}, [newCurrentPage])

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

function deepEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
	  return false;
	}
	for (const key of keys1) {
	  const val1 = object1[key];
	  const val2 = object2[key];
	  const areObjects = isObject(val1) && isObject(val2);
	  if (
		areObjects && !deepEqual(val1, val2) ||
		!areObjects && val1 !== val2
	  ) {
		return false;
	  }
	}
	return true;
}
function isObject(object) {
	return object != null && typeof object === 'object';
}  