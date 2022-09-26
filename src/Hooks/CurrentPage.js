import React, { useContext, useState } from "react";

const CurrentPageContext = React.createContext();
const CurrentPageUpdateContext = React.createContext();

export function useCurrentPage() {
	return useContext(CurrentPageContext);
}

export function useCurrentPageUpdate() {
	return useContext(CurrentPageUpdateContext);
}

export function CurrentPageProvider({ children }) {
	const [currentPage, setCurrentPage] = useState({});
	function changeCurrentPage(page) {
		localStorage.setItem("currentPageId", page.id)
		setCurrentPage(page);
	}
	return (
		<CurrentPageContext.Provider value={currentPage}>
			<CurrentPageUpdateContext.Provider value={changeCurrentPage}>
				{children}
			</CurrentPageUpdateContext.Provider>
		</CurrentPageContext.Provider>
	);
}
