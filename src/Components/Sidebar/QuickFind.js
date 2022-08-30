import React,{useState} from "react";
import search from "../image/search.png"
import letter from "../image/letters.png"
import searchUser from "../image/search-user.png"
import downMenu from "../image/down-menu.png"
import searchPage from "../image/search-page.png"
import calendar from "../image/calendar.png"
import pageIcon from "../image/page.png"
import backIcon from "../image/back-arrow.png"


export default function QuickFind(){
    const [isQuickFind, setIsQuickFind] = useState(false);
    const handleToggle = (e) => {
        if(e.target.className.includes("QuickFind") === true){
            setIsQuickFind(prveQuickFind => !prveQuickFind)
        }
    };
    const [isSearchText,setIsSearchText] = useState("")
    console.log(isSearchText);
    const handleChange = (event) =>(setIsSearchText(event.target.value))
    const searchPageList = (
        <div className="flex items-center justify-between py-2 px-4 point group">
            <div className="flex items-center">
                <img className="w-5 h-5 mr-3" src={pageIcon} alt="page-icon" />
                <p className="text-sm font-semibold">頁面標題</p>
            </div>
            <img className="w-5 h-5 opacity-0 group-hover:opacity-80" src={backIcon} alt="back-icon" />
        </div>
    )

    return(
        <div>
            <div onClick={handleToggle} className="QuickFind flex items-center point py-1 px-3" >
                <img src={search} alt="seach" className="QuickFind w-5 h-5 p-0.5 mr-2"/>
                <p className="QuickFind text-sm font-semibold text-gray-600">Quick find</p>
            </div>  

            {isQuickFind && <div onClick={handleToggle}  className="QuickFind fixed bg-gray-500 bg-opacity-30 w-screen top-0 bottom-0 left-0 z-20">
                <div className="fixed w-5/12 h-3/6 m-auto top-40 left-10 right-10 bg-white opacity-100 rounded-lg">
                    <div className="px-5 py-3 flex items-center">
                        <img className="w-5 h-5 mr-3" src={search} alt="seach" />
                        <input type="text" placeholder="Search username's Notion..." onChange={handleChange} className="focus:outline-none w-full text-xl"/>
                    </div>
                    <hr />
                    <div className="flex px-5 py-3">
                        <div className="flex items-center border rounded-2xl py-0.5 px-2 mr-1">
                            <img className="w-5 h-5 p-0.5 mr-1" src={letter} alt="letter" />
                            <p className="text-sm text-gray-500">Only search titles</p>
                        </div>
                        <div className="flex items-center border rounded-2xl py-0.5 px-2 mr-1">
                            <img className="w-5 h-5 p-0.5 mr-1" src={searchUser} alt="search-user" />
                            <p className="text-sm text-gray-500 mr-1">Created by</p>
                            <img className="w-5 h-5 p-0.5 mr-1" src={downMenu} alt="down-menu" />
                        </div>
                        <div className="flex items-center border rounded-2xl py-0.5 px-2 mr-1">
                            <img className="w-5 h-5 p-0.5 mr-1" src={searchPage} alt="search-page" />
                            <p className="text-sm text-gray-500 mr-1">In page</p>
                            <img className="w-5 h-5 p-0.5 mr-1" src={downMenu} alt="down-menu" />
                        </div>
                        <div className="flex items-center border rounded-2xl py-0.5 px-2 mr-1">
                            <img className="w-5 h-5 p-0.5 mr-1" src={calendar} alt="calendar" />
                            <p className="text-sm text-gray-500 mr-1">In page</p>
                            <img className="w-5 h-5 p-0.5 mr-1" src={downMenu} alt="down-menu" />
                        </div>
                    </div>

                    <div className="h-4/6 overflow-x-hidden overflow-y-auto px-1 py-1">
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-500 px-4">Today</p>
                            <div>
                                {searchPageList}
                                {searchPageList}
                                {searchPageList}
                                {searchPageList}

                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-500 px-4">Yesterday</p>
                            <div>
                                {searchPageList}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 px-4">Past Week</p>
                            <div>
                                {searchPageList}
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center px-5 mt-auto border-t">
                        <div className="flex items-center mr-5">
                            <img className="w-5 h-5 p-1" src={backIcon} alt="back-icon" />
                            <p className="text-sm text-gray-400">Open</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-sm text-gray-400 -mr-1.5">⌘</p>
                            <img className="w-5 h-5 p-1" src={backIcon} alt="back-icon" />
                            <p className="text-sm text-gray-400">Open in a new tab</p>
                        </div>
                        
                    </div>
                </div>
            </div>}
        </div>
        
        
    )

}