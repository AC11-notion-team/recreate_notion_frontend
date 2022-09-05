import React from "react";
import Title from "./Title";

export default function MenuButton({handleClick=null,alt=null,src=null,className=null,content=null,illustrate=null,titleIcon=null}){
   
    return(
        <div className="point flex p-1 items-center" onClick={handleClick}>
            {src && <img src={src} alt={alt} className={`w-4 h-5 mr-2 ${className}`}/>}
            <span >{titleIcon}</span>
            <div>
                <p className="text-sm whitespace-pre mx-2">{content}</p>
                <p className="text-xs text-gray-400 mx-2">{illustrate}</p>
            </div>
        </div>
    )
}