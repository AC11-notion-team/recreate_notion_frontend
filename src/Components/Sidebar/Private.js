import React  from "react";
import Page from "./Page";

import { usePages  } from "../../Hooks/Pages";
import { useCurrentPageUpdate } from "../../Hooks/CurrentPage";


function Private() {
	const pages = usePages();
	const changeCurrentPage = useCurrentPageUpdate();
	const handleChangeCurrentPage = (page) => {changeCurrentPage(page)}

	return (
		<div className="px-1 py-1">
			{pages.map((page) => (
				<Page
					key={page.id}
					handleChangeCurrentPage = {() => handleChangeCurrentPage(page)}
					page={page}
				/>
			))}
		</div>
	);
}
export default React.memo(Private)