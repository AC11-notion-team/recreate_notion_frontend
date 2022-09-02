import React from "react";

export default function MenuButton({handleClick=null,alt,src,className=null,content=null,illustrate=null}){
   
    return(
        <div className="point flex p-1 " onClick={handleClick}>
            <img src={src} alt={alt} className={`w-4 h-5 mr-2 ${className}`}/>
            <div>
                <p className="text-sm whitespace-pre mx-2">{content}</p>
                <p className="text-xs text-gray-400 mx-2">{illustrate}</p>
            </div>
        </div>
    )
}