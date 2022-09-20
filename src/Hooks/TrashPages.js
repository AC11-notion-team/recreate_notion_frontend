import React, { useContext, useState } from "react";

const TrashPagesContext = React.createContext();
const TrashPagesUpdateContext = React.createContext();

export function useTrashPages() {
	return useContext(TrashPagesContext);
}

export function useTrashPagesUpdate() {
	return useContext(TrashPagesUpdateContext);
}

export function TrashPagesProvider({ children }) {
	const [trashPages,setTrashPages] = useState([])
	function changeTrashPages(trashPages) {
		setTrashPages(trashPages);
	}

	return (
		<TrashPagesContext.Provider value={trashPages}>
			<TrashPagesUpdateContext.Provider value={changeTrashPages}>
				{children}
			</TrashPagesUpdateContext.Provider>
		</TrashPagesContext.Provider>
	);
}
