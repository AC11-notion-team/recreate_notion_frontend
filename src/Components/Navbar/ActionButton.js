import React from "react";


export default function ActionButton({handleClick=null,alt=null,src=null,className=null,content=null,illustrate=null,titleIcon=null}){
    return(
        <div className={`point flex p-1 items-center ${className}`} onClick={handleClick}>
            {src && <img src={src} alt={alt} className="w-5 h-5 mr-2 p-0.5"/>}
            <span>{titleIcon}</span>
            <p className={`text-sm whitespace-pre mx-2`}>{content}</p>
            {illustrate &&<p className={`text-xs text-gray-400 mx-2`}>{illustrate}</p>}
        </div>
    )
}