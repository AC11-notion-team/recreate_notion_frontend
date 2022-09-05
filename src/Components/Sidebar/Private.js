import React from "react";
import PageList from "./PageList";

export default function Private({chosenEmoji,onEmojiClick,title}){
    return(
        <div>
            <PageList chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title} />
        </div>
    )
}