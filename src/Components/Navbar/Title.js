import React,{useState} from "react";
import star from "../image/full-star.png"
import Emoji from "./EmojiPicker";
import { useDetectClickOutside } from 'react-detect-click-outside';

export default function Title({ closeDropdown }){
    const [isTitleButton,setIsTitleButton] = useState(false)
    const [isTitle,setIsTitle] = useState("標題")
    console.log(isTitle);
    const handleChange = (event) =>(setIsTitle(event.target.value))
    const handleToggle = () => {
        setIsTitleButton(prveTitleButton => !prveTitleButton)
    };
    const ref = useDetectClickOutside({
        onTriggered: closeDropdown,
        allowAnyKey: true,
    });



    return(
        <div ref={ref}>
            <div className="flex items-center ml-3 point header-icon" onClick={handleToggle}>
                <img className="w-4 h-4" src={star} alt="titleImg" />
                <p className="px-2 text-sm whitespace-nowrap">{isTitle}</p>
            </div>
            {isTitleButton && 
                <div className="fixed border-2 box-shadow bg-white top-10 rounded flex-grow z-10 w-3/12 min-w-max ">
                    <div className="flex items-center py-1 px-2">
                        <Emoji />
                        <input type="text" onChange={handleChange} className="share-like-input h-7 w-full rounded" />
                    </div>
                </div>}
        </div>
    )
}