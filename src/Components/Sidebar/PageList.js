import React from "react";
import Page from "./Page";

const PageList = ({page, chosenEmoji, onEmojiClick, title,handlePageID}) => {
	const pages = [...page];
	return (
		<div className="py-1 px-1 ">
			{pages.map((ele) => {
				return <Page key={ele.id} title1={ele.title} chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title} handlePageID={handlePageID} pageID={ele.id}  />;
			})}
		</div>
	);
};
export default PageList;
