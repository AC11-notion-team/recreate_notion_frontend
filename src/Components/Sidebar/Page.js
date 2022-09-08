import React, { useState, useEffect } from "react";
import pageButtonRight from "../image/pageButtonRight.png";
import addPage from "../image/plus.png";
import PageMore from "./PageMore";
import Emoji from "../Navbar/EmojiPicker";

const Page = ({onEmojiClick,pageTitle,handlePageID,pageIcon,pageID}) => {

	const [displayDropdown, setDisplayDropdown] = useState(true);

	const closeDropdown = () => {
		setDisplayDropdown(false);
	};
	useEffect(() => {
		if (displayDropdown === false) {
			setDisplayDropdown(true);
		}
	}, [displayDropdown]);
	return (
		<div className="py-1 px-1 ">
			<div className="flex items-center justify-between point group px-1.5 py-1">
				<div className="flex items-center w-full">
					<button className="mr-1 flex items-center w-5 h-5">
						<img
							className="w-5 h-5 py-1.5 mr-1"
							src={pageButtonRight}
							alt="right"
						/>
                    	<Emoji pageID={pageID} pageIcon={pageIcon} onEmojiClick={onEmojiClick} />
						
					</button>
					<button  onClick={()=>{handlePageID(pageID)}}>
						<p className="text-sm font-semibold text-gray-600 ml-2 whitespace-nowrap overflow-x-hidden" value={pageTitle}>
							{pageTitle}
						</p>
					</button>
				</div>
				<div className="flex items-center mx-2">
					{displayDropdown && <PageMore  closeDropdown={closeDropdown}/>}

					<button
						className="opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded w-5 h-5 p-1"
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
