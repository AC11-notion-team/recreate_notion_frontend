import React from "react";

export default function Navlist ({href,text}) {
    return (
    <li>
        <a 
        href={href}
        className=""
        >
        {text}   
        </a>
    </li> 
        
    )
}