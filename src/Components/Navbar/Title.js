import React, { useState } from "react";
import Emoji from "./EmojiPicker";
import ActionButton from "./ActionButton";
import { useCurrentPageId } from "../../CurrentPageId";

export default function Title({ pageTitle, pageIcon, onEmojiClick }) {
	const currentPageId = useCurrentPageId();

	const [isTitleButton, setIsTitleButton] = useState(false);
	const handleToggle = (e) => {
		if (e.target.className.includes("IsTitle") === true) {
			setIsTitleButton((prevTitleButton) => !prevTitleButton);
		}
	};

	return (
		<div>
			<ActionButton
				titleIcon={pageIcon ? pageIcon : "🙃"}
				content={pageTitle}
				className="IsTitle py-0.5 -mr-0.5"
				handleClick={handleToggle}
			/>
			{isTitleButton && (
				<div
					onClick={handleToggle}
					className="IsTitle fixed  w-screen top-0 bottom-0 z-50"
				>
					<div className="absolute border-2 box-shadow bg-white top-10 rounded flex-grow z-10 w-3/12 min-w-max ">
						<div className="flex items-center py-1 px-2">
							<div className="flex items-center border rounded mr-2 point px-1 h-7">
								<Emoji
									currentPageID={currentPageId}
									pageIcon={pageIcon}
									onEmojiClick={onEmojiClick}
								/>
							</div>
							<input
								type="text"
								onChange={(event) => onEmojiClick(event, currentPageId)}
								className="share-like-input h-7 w-full rounded title"
								id={currentPageId}
								value={pageTitle}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
