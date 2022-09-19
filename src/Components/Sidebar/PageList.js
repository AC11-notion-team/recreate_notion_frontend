import React, { useEffect } from "react";
import Page from "./Page";
import { usePages, usePagesUpdate } from "../../Pages";
import { useCurrentPageId, useCurrentPageUpdateId } from "../../CurrentPageId";

const PageList = ({ page, currentPageID, handlePageID, onEmojiClick }) => {
	const pages = usePages();
	const changePages = usePagesUpdate();
	const currentPageId = useCurrentPageId();
	const changeCurrentPageId = useCurrentPageUpdateId();
	const baseUrl = process.env.REACT_APP_BASEURL;

	return (
		<div className="py-1 px-1 ">
			{pages.map((ele) => {
				return (
					<Page
						key={ele.id}
						title={ele.title}
						onEmojiClick={onEmojiClick}
						handlePageID={handlePageID}
						pageID={ele.id}
						icon={ele.icon}
						currentPageID={currentPageID}
					/>
				);
			})}
		</div>
	);
};
export default PageList;
