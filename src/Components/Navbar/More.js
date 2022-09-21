import React,{useState} from "react";
import more from "../image/more.png"
import right from "../image/forward.png"
import lock from "../image/lock.png"
import link from "../image/link.png"
import notion from "../image/notion.png"
import left from "../image/left.png"
import deletePageImg from "../image/undo.png"
import history from "../image/history.png"
import trash from "../image/delete.png"
import exportImg from "../image/export.png"
import bottom from "../image/bottom.png"
import connect from "../image/connect.png"
import question from "../image/question.png"
import MenuButton from "./MenuButton";
import ActionButton from "./ActionButton"
import emptyStar from "../image/empty-star.png"
import fullStar from "../image/full-star.png"
import { useCurrentPageId ,useCurrentPageUpdateId  } from "../../Hooks/CurrentPageId";
import { usePagesUpdate } from "../../Hooks/Pages";
import axios from "axios";
import {useFavorite,useFavoriteUpdate} from "../../Hooks/Favorite"

export default function More(){
    const favorite = useFavorite();
	const changeFavorite = useFavoriteUpdate();
    const [isMore,setIsMore] = useState(false)
    const handleToggle = (e) => {
        if(e.target.className.includes("IsMore") === true){
            setIsMore(prevMore => !prevMore)
        }
    };
    const currentPageId = useCurrentPageId();
    const baseUrl = process.env.REACT_APP_BASEURL;

	const changePages = usePagesUpdate();
	const changeCurrentPageId = useCurrentPageUpdateId();
    let prevId =""
	const removePage = () => {
		axios({
			method: "delete",
			url: `${baseUrl}/pages/${currentPageId}/delete_page`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		}).then((res) => {
			changePages((prevPages) => {
				return prevPages.filter((item) => {
					if(item.id !== currentPageId){
						prevId = item.id
					}else{
						changeCurrentPageId(prevId)
					}
					return item.id !== currentPageId
					
				});
			});
		})
	};
    
    return(
        <div className="flex items-center">
            <MenuButton className="IsMore" handleClick={handleToggle} alt="moreButton"  src={more} />

            {isMore&& <div onClick={handleToggle}  className="IsMore fixed  w-screen top-0 bottom-0 left-0 z-20">
                <div className="absolute w-60 bg-white border-2 box-shadow right-4 top-12 rounded-md">
                    <div className="p-1.5">
                        <ActionButton src={right} alt="moveTo" content="Move to"/>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <ActionButton src={lock} alt="lockDatabase" content="Lock database" className="px-0.5 py-0.5"/>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <ActionButton src={favorite ? fullStar:emptyStar} alt="favorite" content={favorite ? "Remove from Favorites":"Add to Favorites"} className="py-0.5" handleClick={changeFavorite} />
                        <ActionButton src={link} alt="copyLink" content="Copy link" className="py-0.5"/>
                        <ActionButton src={notion} alt="openInMacApp" content="Open in Mac app" className="py-0.5"/>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <ActionButton src={left} alt="undo" content="Undo" className="py-0.5"/>
                        <ActionButton src={history} alt="pegeHistory" content="Page history" className="py-0.5"/>
                        <ActionButton src={deletePageImg} alt="showDeleted" content="Show deleted pages" className="py-0.5"/>
                        <ActionButton src={trash} alt="delete" content="Delete" className="py-0.5" handleClick={removePage}/>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <ActionButton src={exportImg} alt="export" content="Export" className="py-0.5"/>
                        <ActionButton src={bottom} alt="mergeWithCSV" content="Merge with CSV" className="py-0.5"/>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <ActionButton src={connect} alt="connectSlackChannel" content="Connect Slack channel" className="py-0.5"/>
                        <div className="mb-2 mt-4">
                            <p className="text-xs text-gray-400">Last edited by user</p>
                            <p className="text-xs text-gray-400">Today at 9:40 PM</p>
                        </div>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <ActionButton src={question}alt="learnAbout" illustrate="Learn about databases" className="py-1 px-0.5"/>
                    </div>
                </div>
            </div>}
        </div>
    )
}