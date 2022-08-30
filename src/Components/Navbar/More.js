import React,{useState} from "react";
import more from "../image/more.png"
import right from "../image/forward.png"
import lock from "../image/lock.png"
import star from "../image/empty-star.png"
import link from "../image/link.png"
import notion from "../image/notion.png"
import left from "../image/left.png"
import undo from "../image/undo.png"
import history from "../image/history.png"
import trash from "../image/delete.png"
import exportImg from "../image/export.png"
import bottom from "../image/bottom.png"
import connect from "../image/connect.png"
import question from "../image/question.png"

export default function More(){
    const [isMore,setIsMore] = useState(false)
    const handleToggle = (e) => {
        if(e.target.className.includes("IsMore") === true){
            setIsMore(prveMore => !prveMore)
        }
    };
    return(
        <div>
            <button className="IsMore point flex items-center" onClick={handleToggle}>
                <img className="IsMore w-8 header-icon point" alt="moreButton"  src={more}  />
            </button>
            
            {isMore&& <div onClick={handleToggle}  className="IsMore fixed  w-screen top-0 bottom-0 left-0 z-20">
                <div className="absolute bg-white border-2 box-shadow right-4 top-12 rounded">
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={right} alt="moveTo" className="w-4 h-5 mr-2 "/>
                            <p className="text-sm whitespace-pre mx-2">Move to                </p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-2" >⌘+Shift+P</span>
                        </div>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={lock} alt="lockDatabase" className="w-4 h-5 mr-2 px-0.5 py-1"/>
                            <p className="text-sm mx-2">Lock database</p>
                        </div>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={star} alt="favorite" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm mx-2">Add to Favorites</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={link} alt="copyLink" className="w-4 h-5 mr-2 pt-0.5"/>
                            <p className="text-sm mx-2">Copy link</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={notion} alt="openInMacApp" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm mx-2">Open in Mac app</p>
                        </div>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={left} alt="undo" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm whitespace-pre mx-2">Undo                             </p>
                            <p className="text-gray-400 text-xs whitespace-nowrap ml-2">⌘+Z</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={history} alt="pegeHistory" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm mx-2">Page history</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={undo} alt="showDeleted" className="w-4 h-5 mr-2 pt-0.5"/>
                            <p className="text-sm mx-2">Show deleted pages</p>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={trash} alt="delete" className="w-4 h-5 mr-2 pt-0.5"/>
                            <p className="text-sm mx-2">Delete</p>
                        </div>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={exportImg} alt="export" className="w-4 h-5 mr-2 pt-0.5"/>
                            <div className="mx-2">
                                <p className="text-sm ">Export</p>
                                <p className="text-xs text-gray-500">PDF, HTML, Markdown</p>
                            </div>
                        </div>
                        <div className="point flex p-1 ">
                            <img src={bottom} alt="mergeWithCSV" className="w-4 h-5 mr-2 pt-1"/>
                            <p className="text-sm whitespace-pre mx-2">Merge with CSV          </p>
                        </div>
                    </div>
                    <hr />
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={connect} alt="connectSlackChannel" className="w-4 h-5 mr-2 py-0.5"/>
                            <p className="text-sm mx-2">Connect Slack channel</p>
                        </div>
                        <div className="my-2">
                            <p className="text-xs text-gray-500">Last edited by 莊茹瑄</p>
                            <p className="text-xs text-gray-500">Today at 9:40 PM</p>
                        </div>

                    </div>
                    <hr />
                    <div className="p-1.5">
                        <div className="point flex p-1 ">
                            <img src={question} alt="learnAbout" className="w-4 h-5 mr-2 px-0.5 py-1"/>
                            <p className="text-xs text-gray-500">Learn about databases</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}