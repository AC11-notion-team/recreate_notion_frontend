import React,{useState} from "react"
import rename from "../image/edit.png";
import ActionButton from "../Navbar/ActionButton";
import { useCurrentPageId } from "../../CurrentPageId";
import Emoji from "../Navbar/EmojiPicker";

export default function Rename({onEmojiClick,pageTitle, pageIcon,handlePageMore}){
    const currentPageId = useCurrentPageId();
    const [isRename, setIsRename] = useState(false);
	const handleToggle = (e) => {
		if (e.target.className.includes("IsRename") === true) {
			setIsRename((prevTitleButton) => !prevTitleButton);
		}
        
	};
    const cb = (event) => onEmojiClick(event, currentPageId)
    return(
        <div>
            <ActionButton
                src={rename}
                alt="rename"
                content="Rename"
                className="py-0.5 IsRename"
                handleClick={handleToggle}  
			/>
            {isRename &&
                <div className="absolute border-2 box-shadow bg-white left-20 rounded flex-grow z-10 w-3/12 min-w-max ">
                    <div className="flex items-center py-1 px-2">
                        <div className="flex items-center border rounded mr-2 point px-1 h-7">
                            <Emoji
                                pageIcon={pageIcon}
                                onEmojiClick={onEmojiClick}
                            />
                        </div>
                        <input
                            type="text"
                            onChange={cb}
                            className="share-like-input h-7 w-full rounded title"
                            id={currentPageId}
                            value={pageTitle}
                        />
                    </div>
                </div>}
        </div>
    )
}