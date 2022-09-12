import React from "react";


const Button = props => (
    <button 
        type={props} 
        className="bg-red-400 hover:bg-red-500 transition-color duration-200 text-white text-lg p-3 rounded border border-red-100 "
        >
        {props.children}
    </button>
)

export default function StartNotion (props) {
    return (
    <>
    <div className="flex flex-col items-center max-w-7xl mx-auto relative bg-[#fffefc]">
            <img className="w-20 h-20 mb-8" src="/zittel1.png" alt="" />
        <div className="font-bold text-6xl leading-tight ">Try Zettel today</div>  
            <p className="text-2xl font-light leading-9  text-gray-500 ">Get started for free.</p>
            <p className="text-2xl font-light leading-9 mb-4 text-gray-500 ">Add your whole team as your needs grow.</p>
             <Button type="submit" >Try Zettel free</Button>
        <div className="flex mt-3  ">
            <p className="text-2xl font-light leading-9 mb-4 text-gray-500 ">On a big team? </p>
            <a className=" underline decoration-2 text-2xl font-light leading-9 mb-4 text-gray-500 hover:text-red-500 "  href="#">Contact sales</a>
        </div>
        <div className="absolute left-0 pt-60">
             <img className="w-96 " src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/sitting-character.png" alt="" />      
        </div>  
    </div>  
    </> 
    );
}