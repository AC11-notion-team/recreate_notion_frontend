import React, { useState } from "react";


const SlideContent = (image_path) => (
     <div className="w-8/12 rounded drop-shadow-2xl">
       <img src={image_path} alt="" />
     </div>
    );


const BUTTONS = ["Company home", "Roadmap", "Design docs", "Engineering wiki", "Meeting notes", "Website publishing"];

const renderPage = { 
'Company home': SlideContent("/slideshow1.png"),
'Roadmap': SlideContent("/slideshow2.png"),
'Design docs': SlideContent("/slideshow3.png"),
'Engineering wiki': SlideContent("/slideshow4.png"),
'Meeting notes': SlideContent("/slideshow5.png"),
'Website publishing': SlideContent("/slideshow6.png"),

};

export default function Slideshow (props) {

        const [status, setStatus] = useState("Company home");

        const atClick = (value) => {
            setStatus(value)
        };

        return (
            <>
            <div className="md:flex justify-between max-w-7xl mx-auto bg-[#fffefc]">
              <div className="md:flex flex-col text-2xl font-bold " >
            {BUTTONS.map((button) => (
                <button
                key={button}
                onClick={() => {
                    atClick(button);
                }}
                className={button === status ? `btn btn-clicked text-left hover:bg-gray-100 rounded mb-6` : `btn text-left hover:bg-gray-100 rounded mb-6`}
                >
                {button}
                </button>
            ))}  
            </div>
            {renderPage[status]}
            </div>
            <div className="max-w-7xl mx-auto pb-28 border-b-2  border-grey-100 mb-20 bg-[#fffefc]"/>
            </>
        );
    
}   

