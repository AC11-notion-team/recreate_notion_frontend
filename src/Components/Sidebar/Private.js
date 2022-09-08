import React from "react";
// import PageList from "./PageList";
import Page from "./Page"

export default function Private({pages,currentPageID,handlePageID,onEmojiClick}) {
	
	const page = pages.map(item =>{
		return (
			<Page
				onEmojiClick={onEmojiClick}
				pageTitle= {item.title}
				handlePageID={handlePageID}
				pageIcon ={item.icon}
				pageID={item.id}
			/>
		)
	})
	return (
		<div>
			{page}
		</div>
	);
}
