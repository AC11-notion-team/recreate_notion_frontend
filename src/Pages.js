import React, { useContext, useState } from "react";

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
	function changePages(pages) {
		setPages(pages);
	}

	return (
		<PagesContext.Provider value={pages}>
			<PagesUpdateContext.Provider value={changePages}>
				{children}
			</PagesUpdateContext.Provider>
		</PagesContext.Provider>
	);
}
