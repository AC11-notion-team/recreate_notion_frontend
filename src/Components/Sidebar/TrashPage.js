import React from "react";
import backIcon from "../image/back-arrow.png"
import axios from "axios";
import { usePagesUpdate } from "../../Hooks/Pages";
import {useCurrentPageUpdateId} from "../../Hooks/CurrentPageId"
import {useTrashPagesUpdate} from "../../Hooks/TrashPages"

export default function TrashPage({trashPageID,trashPageIcon,trashPageTitle}){
    const baseUrl = process.env.REACT_APP_BASEURL;
    const changePages = usePagesUpdate();
    const changeCurrentPage = useCurrentPageUpdateId()
    const changeTrashPages = useTrashPagesUpdate()
    const restorePage = (pageId) => {
        axios({
            method: "put",
            url: `${baseUrl}/users/restore_page`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
            },
            params: {
                restorePageId: pageId
            },
        })
        .then((res)=>{
            changeTrashPages (prevTrahsPages => {
                return prevTrahsPages.filter((respage)=>{
                    return respage.id != trashPageID
                })
            })
            changePages(prevPages =>{
                return [...prevPages,res.data]
            })
            changeCurrentPage(res.data.id)
        }).catch((err) => {
            console.error(err);
        });
        
    }
  
    return(
        <div className="flex items-center justify-between py-2 px-4 point group">
            <div className="flex items-center">
                <span className="w-5 h-5 mr-3">{trashPageIcon ? trashPageIcon:"🗒️"}</span>
                <p className="text-sm font-semibold">{trashPageTitle}</p>
            </div>
            <img data-id={trashPageID} className="w-5 h-5 hidden group-hover:inline-block" src={backIcon} alt="back-icon" onClick={(event)=>restorePage(event.target.dataset.id)} />
        </div>
    )
}