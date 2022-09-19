import React, { useState, useCallback } from "react";
import pageButtonRight from "../image/pageButtonRight.png";
import PageMore from "./PageMore";
import Emoji from "../Navbar/EmojiPicker";
import { useCurrentPageUpdateId } from "../../CurrentPageId";

const Page = ({ onEmojiClick, pageTitle, pageIcon, pageID }) => {
	const changeCurrentPageId = useCurrentPageUpdateId();
	const [displayDropdown, setDisplayDropdown] = useState(false);
	const closeDropdown = useCallback(() => {
		setDisplayDropdown(false);
	}, []);
	const showDropdown = useCallback(() => {
		setDisplayDropdown(true);
	}, []);

	return (
		<div className="px-1 py-1 " onMouseEnter={showDropdown}>
			<div className="flex items-center point group px-1.5 py-1">
				<div className="flex items-center w-full" 
					>
					<button className="flex items-center w-5 h-5 mr-1">
						<img
							className="w-5 h-5 py-1.5 mr-1"
							src={pageButtonRight}
							alt="right"
						/>
						<Emoji
							pageID={pageID}
							pageIcon={pageIcon}
							onEmojiClick={onEmojiClick}
						/>
					</button>
					<button className="w-full text-left" 
                            onClick={() => {changeCurrentPageId(pageID)}}>
						<p
							className="ml-2 overflow-x-hidden text-sm font-semibold text-gray-600 whitespace-nowrap"
							value={pageTitle}
						>
							{pageTitle}
						</p>
					</button>
				</div>
				<div className="flex items-center mx-2 h-5">
					{displayDropdown && (
						<PageMore
							pageTitle={pageTitle}
							pageIcon={pageIcon}
							onEmojiClick={onEmojiClick}
							closeDropdown={closeDropdown}
							pageID={pageID}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Page;
