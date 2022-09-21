import React from "react";
import { usePages } from "../../Pages";
import { useCurrentPageId } from "../../CurrentPageId";
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
        <div className="mt-8 mb-16 mx-20 w-auto">
            <div className="relative flex items-center w-4/6 m-auto max-w-screen-sm">
                <div className="absolute top-0 left-0 cursor-pointer ml-3 text-4xl">
                    <Emoji
                    currentPageID={currentPageId}
                    pageIcon={pageIcon}
                    onEmojiClick={onEmojiClick}
                    />
                </div>
                <input
                    className= "ml-12 text-4xl font-bold  pl-2 outline-none w-3/4" 
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