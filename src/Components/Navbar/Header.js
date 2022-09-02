import React,{useState,useEffect} from "react";
import Share from "./Share"
import More from "./More"
import Title from "./Title";
import Updata from "./Updata"
import menu from "../image/menu.png"
import emptyStar from "../image/empty-star.png"
import fullStar from "../image/full-star.png"
import MenuButton from "./MenuButton";


export default function Header({isFavorite,isSide,toggleFavorite,toggleSide}){
    const [displayDropdown, setDisplayDropdown] = useState(true);

    const closeDropdown = () => {
        setDisplayDropdown(false);
    }
    useEffect(()=>{
        if(displayDropdown===false){
            setDisplayDropdown(true)
        }
    },[displayDropdown])

    return(
       <div className="flex h-12 justify-between px-2 leading-10 relative z-30">
            <div className="flex ">
                {!isSide && <div className="flex items-center">
                    <MenuButton className="sidebarButton" handleClick={toggleSide} alt="sidebarButton"  src={menu} />
                </div>}
                <div className="flex items-center">
                {displayDropdown && <Title  closeDropdown={closeDropdown} /> }
                </div>
            </div >
            <div className="flex">
                <Share />
                <Updata />
                <div className="flex items-center">
                    <MenuButton className="IsFavorite" handleClick={toggleFavorite} alt="favoriteButton"  src={isFavorite ? fullStar:emptyStar} />
                </div>
                <More />
            </div>
       </div> 
    )
}