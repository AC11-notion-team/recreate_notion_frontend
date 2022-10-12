import React, { useState, useCallback} from "react";
import Picker from "emoji-picker-react";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Emoji({ pageIcon, handleEditEmoji }) {
	const [isEmoji, setIsEmoji] = useState(false);
	const toggleEmoji = () => setIsEmoji((prevIsEmoji) => !prevIsEmoji);
	const callback = useCallback((e,emojiObject) => {
		handleEditEmoji(e, emojiObject)
		setIsEmoji(false)
	}, [])

	const ref = useDetectClickOutside({
		onTriggered: () => setIsEmoji(false),
		allowAnyKey: false,
	});

	return (
		<div ref={ref}>
			<div>
				<span className="w-full hover:opacity-80" alt="title" onClick={toggleEmoji}>
					{pageIcon ? pageIcon : "🗒️"}
				</span>
			</div>
			{isEmoji && (
				<div className="absolute z-10">
					<Picker
						onEmojiClick={callback}
						disableSearchBar={true}
					/>
				</div>
			)}
		</div>
	);
}
