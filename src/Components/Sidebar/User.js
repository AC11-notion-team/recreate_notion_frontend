import React,{useState} from "react";
import user from "../image/user.png"
import userData from "../image/userData.png"
import menuLeft from "../image/menu-left.png"
import { useNavigate } from "react-router-dom";

export default function User ({toggle}){
    let navigate = useNavigate()
    const [isUser,setIsUser] = useState(false)
    const handleToggle = (e) => {
        if(e.target.className.includes("User") === true){
            setIsUser(prevUser => !prevUser)
        }
    }
    const logout =()=>{
        localStorage.removeItem('zettel_user_token')
        localStorage.removeItem('zettel_user_id')
        navigate("/")
    };
    
    const userName = localStorage.getItem("zettel_user_id")
    const userEmail =  localStorage.getItem("zettel_user_email")  

    

    return(
        <div>
            <div className="User flex items-center justify-between point group  px-4 p-2">
                <div className="User flex items-center group-hover:opacity-80 py-1.5 px-0.5 w-full" onClick={handleToggle}>
                    <img className="User w-5 h-5 mr-2" src={user} alt="userImg" />
                    <div className="flex items-center">
                        <p className="User mr-1 font-medium text-sm whitespace-nowrap"> {userName}'s Zettel</p>
                        <img className="User w-4 h-3" src={userData} alt="userData" />  
                    </div>   
                </div>
                <button className="w-6 h-6 p-1 opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded" onClick={toggle}>
                    <img src={menuLeft} alt="menuLeft" />
                </button>
            </div>
            {isUser && <div onClick={handleToggle}  className="User fixed  w-screen top-0 bottom-0 left-0 ">
                <div className="absolute bg-white left-3 top-12 w-64  box-shadow  border z-10 rounded min-w-max">
                    <div className="flex items-center justify-between mb-2 p-2 flex-nowrap ">
                        <div className="flex items-center px-1">
                            <img className="w-7 h-7 mr-2" src={user} alt="userImg" />
                            <div className="min-w-max">
                                <p className="font-semibold whitespace-pre"> {userName}'s Zettel</p>
                                <p className="ml-1 whitespace-pre text-xs">{userEmail}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="bg-gray-50">
                        <div className="py-1">
                            <p className="text-xs text-gray-600 py-1 px-3 point my-1" onClick={logout}>Log out all</p>
                        </div>
                    </div>
                </div>
            </div>}
            
        </div>
    )
}