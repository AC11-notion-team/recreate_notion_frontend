import React from "react";

export default function Navlist (props) {
    return (
    <li>
        <a 
        href={props.href}
        className=""
        >
        {props.text}   
        </a>
    </li> 
        
    )
}