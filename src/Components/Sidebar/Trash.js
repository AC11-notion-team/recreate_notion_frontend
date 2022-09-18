import React,{useState} from "react";
import trash from "../image/trash.png"
import axios from "axios";

export default function Trash (){
    const baseUrl = process.env.REACT_APP_BASEURL;
    const [isTrash, setIsTrash] = useState(false)
    const toggleTrash = () => {
        setIsTrash(prevTrash => !prevTrash)
        // axios({
        //     method: "get",
        //     url: `${baseUrl}/`,
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
        //     },
        //     params:{
        //         "currentPageId": currentPageId,
        //         "inviteUsers":inviteUsers
        //     }
        // }).then((res)=>{
        //     changeInviteUser([])
        // }).catch((err) => {
        //     console.log(err);
        // });
    
    }
    
    
    return(
        <div>
            <div className="flex items-center point py-1 px-3" onClick={toggleTrash}>
                <img className="w-5 h-5 mr-2" src={trash} alt="templates" />
                <p className="text-sm font-semibold text-gray-600">Trash</p>
            </div>
            {isTrash && <div>
                <p>All pages</p>

            </div>}
        </div>
        
    )
}