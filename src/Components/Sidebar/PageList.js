import React from "react";
import Page from "./Page";

const PageList = ({page,currentPageID,handlePageID,onEmojiClick}) => {
	
	const pages = [...page];
	console.log(pages);
	
	return (
		<div className="py-1 px-1 ">
			{pages.map((ele) => {
				return <Page key={ele.id} title={ele.title} onEmojiClick = {onEmojiClick} handlePageID={handlePageID} pageID={ele.id} icon={ele.icon} currentPageID={currentPageID} />;
	
			})}
		</div>
	);
};
export default PageList;
