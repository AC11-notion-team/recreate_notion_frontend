import React, { useState, useEffect, useCallback } from "react";
import pageButtonRight from "../image/pageButtonRight.png";
import addPage from "../image/plus.png";
import PageMore from "./PageMore";
import Emoji from "../Navbar/EmojiPicker";
import { useCurrentPageUpdateId } from "../../CurrentPageId";

const Page = ({ onEmojiClick, pageTitle, pageIcon, pageID }) => {
	const changeCurrentPageId = useCurrentPageUpdateId();
	const [displayDropdown, setDisplayDropdown] = useState(true);
	const closeDropdown = useCallback(() => {
		setDisplayDropdown(false);
	}, []);
	const showDropdown = useCallback(() => {
		setDisplayDropdown(true);
	}, []);

	return (
		<div className="px-1 py-1 " onMouseEnter={showDropdown}>
			<div className="flex items-center justify-between point group px-1.5 py-1">
				<div className="flex items-center w-full">
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
					<button
						onClick={() => {
							changeCurrentPageId(pageID);
						}}
					>
						<p
							className="ml-2 overflow-x-hidden text-sm font-semibold text-gray-600 whitespace-nowrap"
							value={pageTitle}
						>
							{pageTitle}
						</p>
					</button>
				</div>
				<div className="flex items-center mx-2">
					{displayDropdown && (
						<PageMore
							pageTitle={pageTitle}
							pageIcon={pageIcon}
							onEmojiClick={onEmojiClick}
							closeDropdown={closeDropdown}
							pageID={pageID}
						/>
					)}

					<button
						className="w-5 h-5 p-1 opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded"
						data-aa="bb"
					>
						<img src={addPage} alt="sidePageMoreButton" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Page;
