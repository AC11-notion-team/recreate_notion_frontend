import React, { useState, useCallback } from "react";
import pageButtonRight from "../image/pageButtonRight.png";
import PageMore from "./PageMore";
import Emoji from "../Navbar/EmojiPicker";

const Page = ({page, handleChangeCurrentPage}) => {
	const {title: pageTitle, icon: pageIcon} = page
	const [displayDropdown, setDisplayDropdown] = useState(false);
	const showDropdown = useCallback(() => {
		setDisplayDropdown(true);
	}, []);

	return (
		<div className="px-1 py-1 " onMouseEnter={showDropdown}>
			<div className="flex items-center point group px-1.5 py-1 h-7">
				<div className="flex items-center w-full" 
					>
					<button className="flex items-center w-5 h-5 mr-1">
						<img
							className="w-5 h-5 py-1.5 mr-1"
							src={pageButtonRight}
							alt="right"
						/>
						<Emoji
							pageIcon={pageIcon}
						/>
					</button>
					<div className="w-full text-left" 
					     onClick={handleChangeCurrentPage}>
						<p className="ml-3 text-sm font-semibold text-gray-600 whitespace-nowrap" value={pageTitle} >
							{pageTitle ? pageTitle : "Untitled"}
						</p>
					</div>
				</div>
				{displayDropdown && <PageMore page={page}/>}
			</div>
		</div>
	);
};

export default Page;
