import React, { useState } from "react";
import Picker from "emoji-picker-react";

export default function Emoji({ emojiPageID, pageIcon, onEmojiClick }) {
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
						onEmojiClick={(event, emojiObject, emojiPageID) =>
							onEmojiClick(event, emojiObject, emojiPageID)
						}
					/>
				</div>
			)}
		</div>
	);
}
