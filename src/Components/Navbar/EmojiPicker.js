import React, { useState} from "react";
import Picker from "emoji-picker-react";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Emoji({pageID,pageIcon, onEmojiClick }) {
	const [isEmoji, setIsEmoji] = useState(false);
	const toggleEmoji = () => setIsEmoji((prevIsEmoji) => !prevIsEmoji);
	const currentPageId = useCurrentPageId();
	const callback = (e,emojiObject) => {
		onEmojiClick(e,currentPageId,pageID, emojiObject)
		setIsEmoji(false)
	}
	const ref = useDetectClickOutside({
		onTriggered: () => {
			console.log("clickout side Emoji")
			setIsEmoji(false)
		},
		allowAnyKey: false,
	});

	return (
		<div ref={ref}>
			<div>
				<span alt="title" onClick={toggleEmoji}>
					{pageIcon ? pageIcon : "🗒️"}
				</span>
			</div>
			{isEmoji && (
				<div className="absolute">
					<Picker
						onEmojiClick={callback}
					/>
				</div>
			)}
		</div>
	);
}
