import React, { useState } from "react";
import Emoji from "./EmojiPicker";
import ActionButton from "./ActionButton";
import { useCurrentPage, useCurrentPageUpdate } from "../../Hooks/CurrentPage";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Title() {
	const currentPage = useCurrentPage();
	const updateCurrentPage = useCurrentPageUpdate()
	const [isTitleButton, setIsTitleButton] = useState(false);
	const {title: pageTitle, icon: pageIcon} = currentPage

	const handleToggle = (e) => {
		setIsTitleButton((prevTitleButton) => !prevTitleButton);
	};

	const handleEditEmoji = (e, emojiObject) =>{
        console.log(emojiObject)
        updateCurrentPage({...currentPage, icon: emojiObject.emoji})
    }

	const handleEditTitle = (event)=>{
		updateCurrentPage({...currentPage, title: event.target.value})
	}

	const handleKeyPress =(e)=>{
		if(e.key === "Enter"){
			setIsTitleButton(false)
		}
	}

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
							onKeyPress={(e)=>handleKeyPress(e)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
