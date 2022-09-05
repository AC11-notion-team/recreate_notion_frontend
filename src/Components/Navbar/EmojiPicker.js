import React,{useState} from "react";
import Picker from 'emoji-picker-react';


export default function Emoji({chosenEmoji, onEmojiClick}){

    const [isEmoji,setIsEmoji] = useState(false)
    const toggleEmoji = () => (setIsEmoji(prveIsEmoji => !prveIsEmoji))
   
    return(
        <div>
            <div>
                <span alt="title" onClick={toggleEmoji}>{chosenEmoji ? chosenEmoji.emoji : "🙃"}</span>
            </div>
            {isEmoji && <div className="absolute ">
                <Picker onEmojiClick={(event, emojiObject)=> onEmojiClick(event, emojiObject)}  />
            </div>}
        </div>
        
    )
}