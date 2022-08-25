import React from "react";
import user from "../image/user.png"
import userData from "../image/userData.png"
import menuLeft from "../image/menu-left.png"
import seach from "../image/seach.png"
import updata2 from "../image/updata2.png"
import setting from "../image/settings.png"
import Star from "./Star"
import pageButtonRight from "../image/pageButtonRight.png"



export default function Sidebar({isFavorite,state,toggleFavorite,toggle}){

    return(
        <div>
            {state && <div className="fixed inset-0 w-1/6 bg-gray-50">
                <div className="flex items-center justify-between point group  px-4 p-2">
                    <div className="flex items-center group-hover:opacity-80 py-1.5">
                        <img className="w-5 h-5 mr-2" src={user} alt="userImg" />
                        <p className="mr-1 font-semibold text-sm"> user's Notion</p>
                        <img className="w-4 h-3" src={userData} alt="userData" />
                    </div>
                    <button className="w-6 h-6 p-1 opacity-0 group-hover:opacity-80 hover:bg-gray-200 hover:rounded" onClick={toggle}>
                        <img  src={menuLeft} alt="menuLeft" />
                    </button>
                </div>
                <div className="mb-2 px-1 py-2">
                    <div className="flex items-center point py-1 px-3">
                        <img src={seach} alt="seach" className="w-5 h-5 p-0.5 mr-2"/>
                        <p className="text-sm font-semibold text-gray-600">Quick find</p>
                    </div>
                    <div className="flex items-center point py-1 px-3">
                        <img src={updata2} alt="seach" className="w-5 h-5 p-0.5 mr-2"/>
                        <p className="text-sm font-semibold text-gray-600">Updates</p>
                    </div>
                    <div className="flex items-center point py-1 px-3">
                        <img src={setting} alt="seach" className="w-5 h-5 p-0.5 mr-2"/>
                        <p className="text-sm font-semibold text-gray-600">Settings & members</p>
                    </div>

                </div>
                <div>
                    <div className="mb-4">
                        <Star state = {isFavorite} toggle = {toggleFavorite}/>
                    </div>
                    <div>
                        <div className="py-1 px-4">
                            <p className="text-xs font-semibold text-gray-500 point">SHARED</p>
                        </div>
                        <div className="py-1 px-1">
                            <div className="flex items-center point px-1.5 py-1">
                                <button className="mr-1"><img className="w-5 h-5 py-1.5 px-0.5" src={pageButtonRight} alt="right" /></button>
                                <img className="w-5 h-5" src={user} alt="pageImg" />
                                <p className="text-sm font-semibold text-gray-600 ml-2">頁面標題</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="py-1 px-4">
                            <p className="text-xs font-semibold text-gray-500 point">PRIVATE</p>
                        </div>
                        <div className="py-1 px-1">
                            <div className="flex items-center point px-1.5 py-1">
                                <button className="mr-1"><img className="w-5 h-5 py-1.5 px-0.5" src={pageButtonRight} alt="right" /></button>
                                <img className="w-5 h-5" src={user} alt="pageImg" />
                                <p className="text-sm font-semibold text-gray-600 ml-2">頁面標題</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>}
        </div>  
    )
}
