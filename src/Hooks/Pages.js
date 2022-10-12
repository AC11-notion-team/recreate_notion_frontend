import React, { useContext, useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCurrentPageChange } from "./CurrentPage"

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
	const params = useParams()
	const [pages, setPages] = useState([]);
	const baseUrl = process.env.REACT_APP_BASEURL;
	const token = `Bearer ${localStorage.getItem("zettel_user_token") || null}`;
	const changeCurrentPage = useCurrentPageChange()
	// useEffect(()=>{
	// 	if (pages.length > 0 ){
	// 		const currentPageId = params["page_id"] || localStorage.getItem("currentPageId") || pages?.[0].id
	// 		const currentPage = pages.filter(page => page.id === currentPageId)?.[0]
	// 		console.log(currentPage)
	// 		currentPage && changeCurrentPage(currentPage);
	// 	}
	// }, [])

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

	function handlePagesTitle(page, newTitle){
		changePages(prevPages =>{
			return prevPages.map(prevPage =>{
				return prevPage.id === page.id 
					?	{...prevPage, title: newTitle}
					:	prevPage
			})
		})
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
			const return_data = response?.data?.pages
			changePages(return_data);
			const currentPageId = params["page_id"] || localStorage.getItem("currentPageId") || return_data?.[0].id
			const currentPage = return_data.filter(page => page.id === currentPageId)?.[0]
			console.log(currentPage)
			changeCurrentPage(currentPage);
		}).catch(error => console.error(error))
	}, [baseUrl, changeCurrentPage, params, token]);
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
