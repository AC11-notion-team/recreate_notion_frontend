import React from "react";
import templates from "../image/templates.png"

export default function Templates (){
    return(
        <div className="flex items-center point py-1 px-3">
            <img className="w-5 h-5 mr-2" src={templates} alt="templates" />
            <p className="text-sm font-semibold text-gray-600">Templates</p>
        </div>
    )
}