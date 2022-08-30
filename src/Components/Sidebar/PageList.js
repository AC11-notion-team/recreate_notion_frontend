import React from "react";
import user from "../image/user.png"
import pageButtonRight from "../image/pageButtonRight.png"
import addPage from "../image/plus.png"
import PageMore from "./PageMore";


export default function PageList (){
    
    return(
        <div className="py-1 px-1">
            <div className="flex items-center justify-between point group px-1.5 py-1">
                <div className="flex items-center">
                    <button className="mr-1"><img className="w-5 h-5 py-1.5 px-0.5" src={pageButtonRight} alt="right" /></button>
                    <img className="w-5 h-5" src={user} alt="pageImg" />
                    <p className="text-sm font-semibold text-gray-600 ml-2">頁面標題</p>
                </div>
                <div className="flex items-center mx-2">
                    <PageMore />
                    <button className="opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded w-5 h-5 p-1"><img src={addPage} alt="sidePageMoreButton" /></button>
                </div>
            </div>
        </div>
    )
}