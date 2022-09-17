import React from "react";

import { usePages } from "../../Pages";
import { useCurrentPageId } from "../../CurrentPageId";
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
        <div className="max-w-650 m-auto">
            <div className="flex">
                <div className="cursor-pointer ml-3">
                    <Emoji
                    currentPageID={currentPageId}
                    pageIcon={pageIcon}
                    onEmojiClick={onEmojiClick}
                    />
                </div>
                <input
                    className= "text-lg  ml-1 pl-2 outline-none w-3/4" 
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