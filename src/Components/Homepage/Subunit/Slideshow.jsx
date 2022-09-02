import React, { useState } from "react";


const TabContent0 = () => <div className="w-8/12  drop-shadow-2xl rounded"><img src="/slideshow1.png" alt="" /></div>;
const TabContent1 = () => <div className="w-8/12  drop-shadow-2xl rounded"><img src="/slideshow2.png" alt="" /></div>;
const TabContent2 = () => <div className="w-8/12  drop-shadow-2xl rounded"><img src="/slideshow3.png" alt="" /></div>;
const TabContent3 = () => <div className="w-8/12  drop-shadow-2xl rounded"><img src="/slideshow4.png" alt="" /></div>;
const TabContent4 = () => <div className="w-8/12  drop-shadow-2xl rounded"><img src="/slideshow5.png" alt="" /></div>;
const TabContent5 = () => <div className="w-8/12  drop-shadow-2xl rounded"><img src="/slideshow6.png" alt="" /></div>;



const BUTTONS = ["Company home", "Roadmap", "Design docs", "Engineering wiki", "Meeting notes", "Website publishing"];

const renderPage = { 
'Company home': <TabContent0 />,
'Roadmap': <TabContent1 />,
'Design docs': <TabContent2 />,
'Engineering wiki': <TabContent3 />,
'Meeting notes': <TabContent4 />,
'Website publishing': <TabContent5 />,

};

export default function Slideshow (props) {

        const [status, setStatus] = useState("Company home");

        const atClick = (value) => {
            setStatus(value)
        };

        return (
            <>
            <div className="md:flex justify-between max-w-7xl mx-auto ">
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
            <div className="max-w-7xl mx-auto pb-28 border-b-2  border-grey-100 mb-20"/>
            </>
        );
    
}   

