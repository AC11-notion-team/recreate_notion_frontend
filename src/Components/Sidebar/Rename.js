import React,{useState} from "react"
import rename from "../image/edit.png";
import ActionButton from "../Navbar/ActionButton";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import Emoji from "../Navbar/EmojiPicker";

export default function Rename({onEmojiClick,pageTitle, pageIcon,pageID,handleMore}){
    const currentPageId = useCurrentPageId();
    const [isRename, setIsRename] = useState(false);
	const handleToggle = (e) => {
        setIsRename((prevTitleButton) => !prevTitleButton);
	};
    const callback = (event) => onEmojiClick(event, currentPageId,pageID)
    const handleKeyPress =(e)=>{
		if(e.key === "Enter"){
			handleMore()
		}
	}
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
                                pageID={pageID}
                            />
                        </div>
                        <input
                            type="text"
                            onChange={callback}
                            className="share-like-input h-7 w-full rounded title"
                            value={pageTitle}
                            placeholder="Untitled"
                            onKeyPress={(e)=>handleKeyPress(e)}  
                        />
                    </div>
                </div>
            }
        </div>
    )
}