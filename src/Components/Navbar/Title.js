import React,{useState} from "react";
import Emoji from "./EmojiPicker";
import ActionButton from "./ActionButton"


export default function Title({chosenEmoji, onEmojiClick,title,handleChange}){
    const [isTitleButton,setIsTitleButton] = useState(false)
  
    const handleToggle = () => {
        setIsTitleButton(prveTitleButton => !prveTitleButton)
    };

    return(
        <div>
             <ActionButton titleIcon={chosenEmoji ? chosenEmoji.emoji : "🙃"} content={title} className="py-0.5 -mr-0.5" handleClick={handleToggle}/>
            {isTitleButton && 
                <div className="fixed border-2 box-shadow bg-white top-10 rounded flex-grow z-10 w-3/12 min-w-max ">
                    <div className="flex items-center py-1 px-2">
                        <div className="flex items-center border rounded mr-2 point px-1 h-7">
                            <Emoji chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick}/>
                        </div>
                        <input type="text" onChange={handleChange} className="share-like-input h-7 w-full rounded" />
                    </div>
                </div>}
        </div>
    )
}