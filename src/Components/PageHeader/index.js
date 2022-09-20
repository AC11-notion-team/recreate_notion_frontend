import React from "react";

import { usePages } from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import Emoji from "../Navbar/EmojiPicker";


function PageHeader({onEmojiClick}) {
    const pages = usePages();
	const currentPageId = useCurrentPageId();
    console.log("render header")
	const pageItem =   pages.filter((item) => {
        console.log("render item")
		return item.id === currentPageId;
	});
	const pageTitle = pageItem[0]?.title;
	const pageIcon = pageItem[0]?.icon;

    return (
        <div className=" mt-8 mb-16 ">
            <div className="flex items-center justify-center">
                <div className="cursor-pointer ml-3">
                    <Emoji
                    currentPageID={currentPageId}
                    pageIcon={pageIcon}
                    onEmojiClick={onEmojiClick}
                    />
                </div>
                <input
                    className= "text-2xl  ml-1 pl-2 outline-none w-3/4" 
                    placeholder="Untitled"
                    onChange={(event) => onEmojiClick(event, currentPageId)}
                    id={currentPageId}
                    value = { pageTitle || '' }
                />  
            </div>
        </div>
            
    );
}

export default PageHeader;