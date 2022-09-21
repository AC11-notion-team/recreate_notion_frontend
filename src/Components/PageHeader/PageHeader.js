import React, { useRef } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { usePages } from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import Emoji from "../Navbar/EmojiPicker";


function PageHeader({onEmojiClick}) {
    const pages = usePages();
	const currentPageId = useCurrentPageId();
	const pageItem =   pages.filter((item) => {
		return item.id === currentPageId;
	});
	const pageTitle = pageItem[0]?.title;
	const pageIcon = pageItem[0]?.icon;
    

    return (
        <div className=" mt-8 mb-16 mx-20 w-auto">
            <div className="relative flex items-center w-4/6 m-auto">
                <div className="absolute top-0 left-0 cursor-pointer ml-3">
                    <Emoji
                    currentPageID={currentPageId}
                    pageIcon={pageIcon}
                    onEmojiClick={onEmojiClick}
                    />
                </div>
                <input
                    className= "ml-12 text-2xl  pl-2 outline-none w-3/4" 
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