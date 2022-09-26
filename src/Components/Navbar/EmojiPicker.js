import React, { useState, useCallback} from "react";
import Picker from "emoji-picker-react";
import { useCurrentPage } from "../../Hooks/CurrentPage";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Emoji({pageID,pageIcon, onEmojiClick }) {
	const [isEmoji, setIsEmoji] = useState(false);
	const toggleEmoji = () => setIsEmoji((prevIsEmoji) => !prevIsEmoji);
	const currentPageId = useCurrentPage();
	const callback = useCallback((e,emojiObject) => {
		onEmojiClick(e,currentPageId,pageID, emojiObject)
		setIsEmoji(false)
	}, [currentPageId, onEmojiClick, pageID])
	const ref = useDetectClickOutside({
		onTriggered: () => setIsEmoji(false),
		allowAnyKey: false,
	});

	return (
		<div ref={ref}>
			<div>
				<span className="w-full " alt="title" onClick={toggleEmoji}>
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
