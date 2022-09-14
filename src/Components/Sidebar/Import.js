import React from "react";
import importImg from "../image/import.png"

export default function Templates (){
    return(
        <div className="flex items-center point py-1 px-3">
            <img className="w-5 h-5 p-0.5 mr-2" src={importImg} alt="templates" />
            <p className="text-sm font-semibold text-gray-600">Import</p>
        </div>
    )
}