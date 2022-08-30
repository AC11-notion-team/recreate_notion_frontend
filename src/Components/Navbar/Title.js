import React from "react";
import star from "../image/full-star.png"

export default function Title({state,toggle}){
    const [isTitle,setIsTitle] = React.useState("標題")
    console.log(isTitle);
    function handleChange (event){
        setIsTitle(event.target.value)
        //submit
    }
    return(
        <div >
            <div className="flex items-center ml-3 point header-icon" onClick={toggle}>
                <img className="w-5 h-5" src={star} alt="title" />
                <h1 className="px-2 text-sm">{isTitle}</h1>
            </div>
            {state && <div className="absolute border-2 box-shadow -left-32 top-10 rounded flex-grow z-10 ">
                <div className="flex items-center py-1 px-2 title-width">
                    <img className="w-7 h-7 mr-2 header-point p-1" src={star} alt="title" />
                    <input type="text" onChange={handleChange} className="share-like-input h-7 rounded" />
                </div>
            </div>}
        </div>
    )
}