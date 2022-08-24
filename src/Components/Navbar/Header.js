import React from "react";
import Share from "./Share"
import Updata from "./Updata"
import Star from "./Star"
import More from "./More"
import clock from "../image/clock.png"
import emptyStar from "../image/empty-star.jpeg"
import fullStar from "../image/full-star.png"
import more from "../image/more.png"
import './header.css'

export default function Header(props){
    return(
       <div className="flex  px-4 leading-10 ">
           <div className="flex ">
                <div className="mr-2" >
                    <button onClick = {props.handleSidebar}>側邊欄選單</button>
                </div>
                <div>
                    <img src="" />
                    <p>標題</p>
                </div>
           </div>
            <div className="flex ">
                <div className="mx-2">
                    share
                    <Share />
                </div>
                <div className="mx-2 flex items-center">
                    <img className="w-5 "  src={clock} alt="updata" />
                    <Updata />
                </div>
                <div className="mx-2 flex items-center">
                    <img className="w-5" src={emptyStar}  />
                    <Star />
                </div>
                <div className="mx-2 flex items-center"> 
                    <img className="w-5 " src={more}  />
                    <More />
                </div>  
            </div>
       </div> 
    )
}