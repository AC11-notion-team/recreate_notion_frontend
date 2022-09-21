import React, { useContext, useState } from "react";

const FavoriteContext = React.createContext();
const FavoriteUpdateContext = React.createContext();

export function useFavorite() {
	return useContext(FavoriteContext);
}

export function useFavoriteUpdate() {
	return useContext(FavoriteUpdateContext);
}

export function FavoriteProvider({ children }) {
	const [isFavorite, setIsFavorite] = useState(false);
	function changeFavorite() {
		setIsFavorite((prevIsFavorite) => !prevIsFavorite);
	}
    
	return (
		<FavoriteContext.Provider value={isFavorite}>
			<FavoriteUpdateContext.Provider value={changeFavorite}>
				{children}
			</FavoriteUpdateContext.Provider>
		</FavoriteContext.Provider>
	);
}
