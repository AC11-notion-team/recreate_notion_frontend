import React,{useState} from "react";
import Picker from 'emoji-picker-react';
import star from "../image/full-star.png"


export default function Emoji(){
    const [isEmoji,setIsEmoji] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null);


    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        toggleEmoji()  
    };
    const toggleEmoji = () => {setIsEmoji(prveEmoji => !prveEmoji)}

    return(
        <div>
            <div>
                {chosenEmoji ? (<span className="h-7 mr-2 header-point p-1 border rounded" alt="title" onClick={toggleEmoji}>{chosenEmoji.emoji}</span>):false}
            </div>
            {isEmoji && <div className="absolute ">
                <Picker onEmojiClick={onEmojiClick}  />
            </div>}
        </div>
        
    )
}