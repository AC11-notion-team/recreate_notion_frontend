import React,{useState} from "react";
import star from "../image/full-star.png"

export default function Title(){
    const [isTitleButton,setIsTitleButton] = useState(false)
    const [isTitle,setIsTitle] = useState("標題")
    console.log(isTitle);
    const handleChange = (event) =>(setIsTitle(event.target.value))
    const handleToggle = (e) => {
        if(e.target.className.includes("TitleButton") === true){
            setIsTitleButton(prveTitleButton => !prveTitleButton)
        }
    };
    return(
        <div >
            <div className="TitleButton flex items-center ml-3 point header-icon" onClick={handleToggle}>
                <img className="TitleButton w-5 h-5" src={star} alt="title" />
                <h1 className="TitleButton px-2 text-sm">{isTitle}</h1>
            </div>
            {isTitleButton && <div onClick={handleToggle}  className="TitleButton fixed w-screen top-0 bottom-0 left-0 z-20">
                <div className="fixed border-2 box-shadow left-32 bg-white top-10 rounded flex-grow z-10 ">
                    <div className="flex items-center py-1 px-2 title-width">
                        <img className="w-7 h-7 mr-2 header-point p-1" src={star} alt="title" />
                        <input type="text" onChange={handleChange} className="share-like-input h-7 rounded" />
                    </div>
                </div>
            </div>}
        </div>
    )
}