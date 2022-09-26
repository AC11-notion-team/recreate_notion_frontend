import React, { useEffect, useMemo,useCallback } from "react";
import Page from "./Page";

import { usePages, usePagesUpdate } from "../../Hooks/Pages";
import { useCurrentPageUpdate } from "../../Hooks/CurrentPage";


function Private({ onEmojiClick,toggleFavorite }) {
	const pages = usePages();
	const changePages = usePagesUpdate();
	const changeCurrentPage = useCurrentPageUpdate();
	const handleChangeCurrentPage = (page) => {
		console.log(page)
		changeCurrentPage(page)
	}

	return (
		<div className="px-1 py-1">
			{pages.map((page) => (
				<Page
					key={page.id}
					handleChangeCurrentPage = {() => handleChangeCurrentPage(page)}
					onEmojiClick={onEmojiClick}
					page={page}
					toggleFavorite ={toggleFavorite}
				/>
			))}
		</div>
	);
}
export default React.memo(Private)