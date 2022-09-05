import React from "react";
import PageList from "./PageList";

export default function Private({page, chosenEmoji, onEmojiClick, title}) {
	return (
		<div>
			<PageList page={page} chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title} />
		</div>
	);
}
