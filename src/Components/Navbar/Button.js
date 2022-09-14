import React from "react";

export default function Button({alt,src}){
    return(
        <button className="point flex items-center" >
            <img className="w-8 header-icon point" alt={alt}  src={src}  />
        </button>
    )
}