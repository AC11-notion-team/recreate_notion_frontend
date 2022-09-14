import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useCurrentPageId } from "../../CurrentPageId";

export default function Emoji({ pageIcon, onEmojiClick }) {
	const [isEmoji, setIsEmoji] = useState(false);
	const toggleEmoji = () => setIsEmoji((prevIsEmoji) => !prevIsEmoji);
	const currentPageId = useCurrentPageId();
	const callback = (e,emojiObject) => {
		onEmojiClick(e,currentPageId, emojiObject)
	}


	return (
		<div>
			<div>
				<span alt="title" onClick={toggleEmoji}>
					{pageIcon ? pageIcon : "🗒️"}
				</span>
			</div>
			{isEmoji && (
				<div className="absolute ">
					<Picker
						onEmojiClick={callback}
					/>
				</div>
			)}
		</div>
	);
}
