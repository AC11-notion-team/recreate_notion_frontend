import React, { useState, useCallback } from "react";
import Emoji from "./EmojiPicker";
import ActionButton from "./ActionButton";
import { useCurrentPage } from "../../Hooks/CurrentPage";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useHandlePageUpdate } from "../../Hooks/Pages"

function Title() {
	const currentPage = useCurrentPage();
	const handlePageUpdate = useHandlePageUpdate()
	const [isTitleButton, setIsTitleButton] = useState(()=>false);
	const {title: pageTitle, icon: pageIcon} = currentPage
	const handleToggle = useCallback(() => setIsTitleButton((prevTitleButton) => !prevTitleButton), [])
	const handleEditEmoji = useCallback((e, emojiObject) => handlePageUpdate({...currentPage, icon: emojiObject.emoji}), [currentPage, handlePageUpdate])
	const handleEditTitle = useCallback((e) => handlePageUpdate({...currentPage, title: e.target.value}), [currentPage, handlePageUpdate])
	const handleKeyPress = useCallback((e)=> {(e.key === "Enter") && setIsTitleButton(false)}, [])
	const ref = useDetectClickOutside({
		onTriggered: () => setIsTitleButton(false),
		allowAnyKey: false,
	});
	
	return (
		<div ref = {ref} >
			<div className="h-6 flex items-center">
				<ActionButton
					titleIcon={pageIcon ? pageIcon : "🗒️"}
					content={pageTitle ? pageTitle : "Untitled"}
					handleClick={handleToggle}
				/>
			</div>
			{isTitleButton && (
				<div className="absolute border-2 box-shadow bg-white top-10 rounded flex-grow z-10 w-3/12 min-w-max ">
					<div className="flex items-center py-1 px-2">
						<div className="flex items-center border rounded mr-2 point px-1 h-7">
							<Emoji
								pageIcon={pageIcon}
								handleEditEmoji={handleEditEmoji}
							/>
						</div>
						<input
							type="text"
							onChange={handleEditTitle}
							className="input h-7 w-full rounded px-1"
							value={pageTitle}
							placeholder="Untitled"
							onKeyPress={handleKeyPress}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
export default React.memo(Title)