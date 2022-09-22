import React from "react";

export default function MenuButton({handleClick,alt=null,src=null,className,content=null}){

    
    return(
        <button className = {`point flex items-center w-full ${className}`} onClick={handleClick}>
          { src ? <img  className={`w-8 header-icon point ${className}`} alt={alt}  src={src}  /> : <p className={`text-sm header-icon point ${className}`}>{content}</p> }
        </button> 
            
    )
}