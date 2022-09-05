import React, { useState, useEffect } from "react";

import Page from "./Page";

const PageList = ({page, chosenEmoji, onEmojiClick, title}) => {
	const pages = [...page];
	return (
		<div className="py-1 px-1 ">
			{pages.map((ele) => {
				return <Page key={ele.id} title1={ele.title} chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title}  />;
			})}
		</div>
	);
};
export default PageList;
