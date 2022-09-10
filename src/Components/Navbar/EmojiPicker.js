import React, { useState } from "react";
import Picker from "emoji-picker-react";

export default function Emoji({ onEmojiClick, titleGroup }) {
	const [isEmoji, setIsEmoji] = useState(false);
	const toggleEmoji = () => setIsEmoji((prevIsEmoji) => !prevIsEmoji);

	return (
		<div>
			<div>
				<span alt="title" onClick={toggleEmoji}>
					{titleGroup.icon ? titleGroup.icon : "🙃"}
				</span>
			</div>
			{isEmoji && (
				<div className="absolute ">
					<Picker
						onEmojiClick={(event, emojiObject) =>
							onEmojiClick(event, emojiObject)
						}
					/>
				</div>
			)}
		</div>
	);
}
