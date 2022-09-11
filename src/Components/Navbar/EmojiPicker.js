import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { onEmojiClick } from "./hook/TitleController";

export default function Emoji({ pageIcon }) {
	const [isEmoji, setIsEmoji] = useState(false);
	const toggleEmoji = () => setIsEmoji((prevIsEmoji) => !prevIsEmoji);

	return (
		<div>
			<div>
				<span alt="title" onClick={toggleEmoji}>
					{pageIcon ? pageIcon : "🙃"}
				</span>
			</div>
			{isEmoji && (
				<div className="absolute ">
					<Picker
						onEmojiClick={(event, emojiObject, currentPageID) =>
							onEmojiClick(event, currentPageID, emojiObject)
						}
					/>
				</div>
			)}
		</div>
	);
}
