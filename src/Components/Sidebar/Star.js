import React from "react";
import right from "../image/right.png"
import user from "../image/user.png"

export default function Star({state}){
    return(
        <div >
        {state &&<div>
                <div className="py-1 px-4">
                    <p className="text-xs font-semibold text-gray-500 point">FAVORITES</p>
                </div>
                <div className="py-1 px-1">
                    <div className="flex items-center point px-1.5 py-1">
                        <button className="mr-1"><img className="w-5 h-5 py-1.5 px-0.5" src={right} alt="right" /></button>
                        <img className="w-5 h-5" src={user} alt="pageImg" />
                        <p className="text-sm font-semibold text-gray-600 ml-2">頁面標題</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}