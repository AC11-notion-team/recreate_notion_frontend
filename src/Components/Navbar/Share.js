import React,{useState} from "react";
import globe from "../image/globe.png"
import question from "../image/question.png"
import link from "../image/link.png"

export default function Share(){
    const [isShare,setIsShare] = useState(false)
    const handleToggle = (e) => {
        if(e.target.className.includes("IsShare") === true){
            setIsShare(prveShare => !prveShare)
        }
    };
    return(
        <div >
            <p className="IsShare text-sm header-icon point"
                 onClick={handleToggle}>Share</p>
            {isShare && <div onClick={handleToggle}  className="IsShare fixed  w-screen top-0 bottom-0 left-0 z-20">
                <div className="absolute border-2 bg-white box-shadow right-0 top-12 rounded " >
                    <div className="flex p-1 m-2 items-center">
                        <button className="share-Universal text-left boredr-1 mr-2 share-like-input point"><p className="leading-5 text-sm">Add emails,people,integratons...</p></button>
                        <button className="share-Universal button-bg"><p className="leading-5  text-white">Invite</p> </button>
                    </div>
                    <hr/>
                    <div className="point"> 
                        <div className="flex justify-between items-center py-3 px-2">
                            <div className="flex items-center">
                                <div className="px-3">
                                    <img src={globe} alt="showToWeb" className="w-7 h-7"/>
                                </div>
                                <div >
                                    <p className="text-sm">Share to web</p>
                                    <p className="text-xs text-gray-500">Publish and share link with anyone</p>
                                </div>
                            </div>
                            <div className="flex items-center w-8 h-4 rounded-2xl p-0.5 box-border share-transition bg-gray-400">
                                <div className="w-3.5 h-3.5 rounded-2xl bg-white share-transition2"></div>
                            </div>
                        </div>
                    
                    </div>
                    <hr />
                    <div>
                        <div className="p-2 flex justify-between">
                            <div className="flex items-center p-1 point">
                                <img src={question} alt="shareHelp" className="w-3 h-3 mr-2 "/>
                                <p className="text-xs text-gray-500">Learn about sharing</p>
                            </div>
                            <div className="flex items-center point p-1">
                                <img src={link} alt="linkButton" className="w-4 h-4 mr-2"/>
                                <p className="text-xs">Copy link</p>
                            </div>
                        </div> 
                    </div>
                </div> 
            </div>}
        </div>
    )
}