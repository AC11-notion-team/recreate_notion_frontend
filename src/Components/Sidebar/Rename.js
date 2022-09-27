import React,{useState} from "react"
import rename from "../image/edit.png";
import ActionButton from "../Navbar/ActionButton";
import { useCurrentPage } from "../../Hooks/CurrentPage";
import Emoji from "../Navbar/EmojiPicker";
import { usePagesUpdate } from "../../Hooks/Pages"
import { useContext } from "react";

export default function Rename({handleMore, page}){
    const {title: pageTitle, icon: pageIcon} = page
    const updatePages = usePagesUpdate()
    const [isRename, setIsRename] = useState(false);
	const handleToggle = (e) => {
        setIsRename((prevTitleButton) => !prevTitleButton);
	};

    const handleEditEmoji = (e, emojiObject) =>{
        console.log(emojiObject)
        updatePages(prevPages => {
            return prevPages.map(prevPage =>{
                return prevPage.id === page.id ? {...page, icon: emojiObject.emoji} : prevPage
            })
        })
    }

    
    const handleEditTitle = (e)=>{
        updatePages(prevPages => {
            return prevPages.map(prevPage =>{
                return prevPage.id === page.id ? {...page, title: e.target.value} : prevPage
            })
        })
    }

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
                                handleEditEmoji={handleEditEmoji}
                            />
                        </div>
                        <input
                            type="text"
                            onChange={handleEditTitle}
                            className="input h-7 w-full rounded title px-1" 
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