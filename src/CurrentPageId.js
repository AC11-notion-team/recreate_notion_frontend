import React, { useContext, useState } from "react";

const CurrentPageIdContext = React.createContext();
const CurrentPageUpdateIdContext = React.createContext();

export function useCurrentPageId() {
	return useContext(CurrentPageIdContext);
}

export function useCurrentPageUpdateId() {
	return useContext(CurrentPageUpdateIdContext);
}

export function CurrentPageIdProvider({ children }) {
	const [currentPageId, setCurrentPageId] = useState("");
	function changeCurrentPageId(pageId) {
		localStorage.setItem("currentPageId", pageId)
		setCurrentPageId(pageId);
	}
	return (
		<CurrentPageIdContext.Provider value={currentPageId}>
			<CurrentPageUpdateIdContext.Provider value={changeCurrentPageId}>
				{children}
			</CurrentPageUpdateIdContext.Provider>
		</CurrentPageIdContext.Provider>
	);
}
