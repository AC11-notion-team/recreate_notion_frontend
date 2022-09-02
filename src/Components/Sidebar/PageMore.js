import React,{useState} from "react";
import more from "../image/more.png"
import trash from "../image/delete.png"
import star from "../image/empty-star.png"
import link from "../image/link.png"
import right from "../image/forward.png"
import question from "../image/question.png"
import ActionButton from "../Navbar/ActionButton"
import duplicate from "../image/duplicate.png"
import rename from "../image/empty-star.png"
import { useDetectClickOutside } from 'react-detect-click-outside';


export default function PageMore ({ closeDropdown }){ 
    const [isPageMore,setIsPageMore] = useState(false)
    const handleToggle = () => {
        setIsPageMore(prvePageMore => !prvePageMore)
    }
   
    const ref = useDetectClickOutside({
        onTriggered: closeDropdown,
        allowAnyKey: true,
    });

    return(
        <div ref={ref}>
            <div onClick={handleToggle}>
                <button className="opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded w-5 h-5 p-1" >
                    <img src={more} alt="sidePageMoreButton mr-2" />
                </button>
            </div>
            {isPageMore && <div className="fixed bg-white  box-shadow  border z-10 rounded w-60 ">
                    <div className="p-1.5">
                        <ActionButton src={trash} alt="delete" content="Delete" className="py-0.5"/>
                        <ActionButton src={star} alt="Favorite" content="Add to Favorites" className="py-0.5"/>
                        <ActionButton src={duplicate} alt="duplicate" content="Duplicate" className="py-0.5"/>
                        <ActionButton src={link} alt="link" content="Copy link" className="py-0.5"/>
                        <ActionButton src={rename} alt="rename" content="Rename" className="py-0.5"/ >
                    </div>
                    <hr />
                    <div className="p-2">
                        <ActionButton src={right} alt="moveTo" content="Move to"/>
                    </div>
                    <hr />
                    <div className="p-2">
                        <div className="my-2">
                            <p className="text-xs px-1 text-gray-500">Last edited by 莊茹瑄</p>
                            <p className="text-xs px-1 text-gray-500">Today at 9:40 PM</p>
                        </div>

                    </div>
                    <hr />
                    <ActionButton src={question}alt="learnAbout" illustrate="Learn about databases" className="py-1 px-0.5"/>
                </div>}
        </div>
    )
}
