import React from "react";
import PageList from "./PageList";

export default function Private({page, titleGroup, onEmojiClick,handlePageID}) {
	return (
		<div>
			<PageList page={page} onEmojiClick = {onEmojiClick} titleGroup={titleGroup} handlePageID={handlePageID} />
		</div>
	);
}
