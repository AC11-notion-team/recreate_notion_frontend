import React from "react";
import Page from "./Page";

const PageList = ({page, titleGroup, onEmojiClick,handlePageID}) => {
	const pages = [...page]; //{}
	return (
		<div className="py-1 px-1 ">
			{pages.map((ele) => {
				return <Page key={ele.id} title1={ele.title} titleGroup={titleGroup} onEmojiClick = {onEmojiClick} handlePageID={handlePageID} pageID={ele.id}  />;
			})}
		</div>
	);
};
export default PageList;
