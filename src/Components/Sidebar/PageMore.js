import React,{useState} from "react";
import more from "../image/more.png"
import trash from "../image/delete.png"
import star from "../image/empty-star.png"
import link from "../image/link.png"
import right from "../image/forward.png"
import question from "../image/question.png"


export default function PageMore (){ 
    const [isPageMore,setIsPageMore] = useState(false)
    const handleToggle = (e) => {
        if (e.target.className.includes("PageMore") === true){
            setIsPageMore(prvePageMore => !prvePageMore)
        }
    }
    return(
        <div>
            <div className="PageMore" onClick={handleToggle}>
                <button className="PageMore opacity-0 group-hover:opacity-80 hover:bg-gray-300 hover:rounded w-5 h-5 p-1" >
                    <img className="PageMore" src={more} alt="sidePageMoreButton mr-2" />
                </button>
            </div>
            {isPageMore && <div className="PageMore fixed bg-white  box-shadow  border z-10 rounded w-60 ">
                    <div className="p-2">
                        <div className="point flex p-1 ">
                            <img src={trash} alt="delete" className="w-4 h-5 mr-2 pt-0.5"/>
                            <p className="text-sm mx-2">Delete</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={star} alt="undo" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm mx-2">Add to Favorites</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={link} alt="pegeHistory" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm mx-2 whitespace-pre">Duplicate                      </p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-2" >⌘+D</span>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={link} alt="showDeleted" className="w-4 h-5 mr-2 pt-0.5"/>
                            <p className="text-sm mx-2 whitespace-pre">Copy link              </p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-2" >⌘+Shift+R</span>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={link} alt="showDeleted" className="w-4 h-5 mr-2 pt-0.5"/>
                            <p className="text-sm mx-2">Rename</p>
                        </div>
                    </div>
                    <hr />
                    <div className="p-2">
                        <div className="point flex p-1 ">
                            <img src={right} alt="moveTo" className="w-4 h-5 mr-2 "/>
                            <p className="text-sm whitespace-pre mx-2">Move to                </p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-2" >⌘+Shift+P</span>
                        </div>
                    </div>
                    <hr />
                    <div className="p-2">
                        <div className="my-2">
                            <p className="text-xs px-1 text-gray-500">Last edited by 莊茹瑄</p>
                            <p className="text-xs px-1 text-gray-500">Today at 9:40 PM</p>
                        </div>

                    </div>
                    <hr />
                    <div className="p-2">
                        <div className="point flex p-1 ">
                            <img src={question} alt="learnAbout" className="w-4 h-5 mr-2 px-0.5 py-1"/>
                            <p className="text-xs text-gray-500">Learn about databases</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
