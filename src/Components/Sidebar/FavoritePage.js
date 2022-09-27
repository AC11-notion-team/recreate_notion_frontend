import React from "react";
import { usePages } from "../../Hooks/Pages";
import Page from "./Page";
import { useCurrentPageUpdate } from "../../Hooks/CurrentPage";

export default function Star() {
	const pages = usePages();
	const changeCurrentPage = useCurrentPageUpdate();
	const favoritePages = pages.filter(page =>page.favorite === true)
	const handleChangeCurrentPage = (page) => { changeCurrentPage(page) }
	return (
		<div>
			{favoritePages?.length>0 ?<div>
					<div className="py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">
							FAVORITES
						</p>
					</div>
					{favoritePages?.map((page) => (
						<Page
							key={page.id}
							handleChangeCurrentPage = {() => handleChangeCurrentPage(page)}
							page={page}
						/>
					))}

				</div>:null}
		</div>
	);
}
