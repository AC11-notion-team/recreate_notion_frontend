import React from "react";
import Share from "./Share"
import Updata from "./Updata"
import More from "./More"
import Title from "./Title";
import updata from "../image/updata.png"
import menu from "../image/menu.png"
import menuRight from "../image/menu-right.png"
import emptyStar from "../image/empty-star.png"
import fullStar from "../image/full-star.png"


export default function Header({isFavorite,state,toggleFavorite,toggle}){
    const [isTitle,setIsTitle] = React.useState(false)
    function toggleTitle(){
        setIsTitle(prveTitle => {
            if((isMore === true)|| (isShare === true)){
                setIsMore()
                setIsShare()
               return false 
            }else{
              return  !prveTitle
            }
        })
    }

    const [isShare,setIsShare] = React.useState(false)
    function toggleShare(){
        setIsShare(prevIsShare => {
            if((isMore === true)||(isTitle === true)){
                setIsMore()
                setIsTitle()
               return false 
            }else{
              return  !prevIsShare
            }
        })  
    }
    const [isMore,setIsMore] = React.useState(false)
    function toggleMOre(){
        setIsMore(prevIsMore => {
            if((isShare === true)||(isTitle === true)){
                setIsShare()
                setIsTitle()
                return false
            }else{
                return !prevIsMore
            }
        })
        
    }
    return(
       <div className="flex h-12 justify-between px-2 leading-10 relative">
           
           <div className="flex ">
                {!state && <div className="flex items-center">
                    <img src={menu} alt="sidebarButton" onClick={toggle} className="w-4 h-4 point" />
                </div>}
                <div className="flex items-center">
                    <Title  state={isTitle} toggle={toggleTitle}/>
                </div>
           </div >
            <div className="flex ">
                <div className="flex items-center">
                    <Share state={isShare}  toggle={toggleShare}/>
                </div>
                <div className="flex items-center">
                    <img className="w-8 header-icon header-point"  src={updata} alt="updata" />
                    <Updata />
                </div>
                <div className="flex items-center">
                    <img className="w-8 header-icon point" 
                        src={isFavorite ? fullStar:emptyStar} onClick={toggleFavorite} alt="favoriteButton"/>
                </div>
                
                <div className="flex items-center"> 
                    <More state={isMore}  toggle={toggleMOre}/>
                </div>  
            </div>
       </div> 
    )
}