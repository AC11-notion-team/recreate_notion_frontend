import React,{useState,useEffect} from "react";
import trash from "../image/trash.png"
import axios from "axios";
import TrashPage from "./TrashPage"
import {useTrashPages,useTrashPagesUpdate} from "../../Hooks/TrashPages"
import { useDetectClickOutside } from "react-detect-click-outside";


export default function Trash (){
    const baseUrl = process.env.REACT_APP_BASEURL;
    const [isTrash, setIsTrash] = useState(false)
    const toggleTrash = () => {
        setIsTrash(prevTrash => !prevTrash)
    }
    const trashPage = useTrashPages()
    const changeTrashPages = useTrashPagesUpdate()
    const ref = useDetectClickOutside({
		onTriggered: () => setIsTrash(false),
		allowAnyKey: false,
	});

    useEffect(()=>{
        if(isTrash){
            axios({
                method: "get",
                url: `${baseUrl}/users/trash_page.json`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
                },
            }).then((res)=>{
                changeTrashPages(res.data.pages)
            }).catch((err) => {
                console.error(err);
            });
        }
    },[isTrash])
    
    
    return(
        <div ref={ref} >
            <div className="flex items-center point py-1 px-3" onClick={toggleTrash}>
                <img className="w-5 h-5 mr-2" src={trash} alt="templates" />
                <p className="text-sm font-semibold text-gray-600">Trash</p>
            </div>
            {isTrash && <div className="absolute left-full bottom-4 w-80 h-96 rounded shadow-2xl bg-white overflow-x-hidden z-20">
                <p className="px-4 py-2 text-lg font-medium text-center">All pages</p>
                <hr />
                <div className="overflow-y-auto h-80">
                    { trashPage.map((item,i)=>(
                        <TrashPage 
                            trashPageID = {item.id}
                            trashPageIcon = {item.icom}
                            trashPageTitle = {item.title}
                            key={i}
                        />
                    ))}
                </div>
            </div>}
        </div>
        
    )
}