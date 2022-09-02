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
    const SearchPageList = () => {
        return(
            <div className="flex items-center justify-between py-2 px-4 point group">
                <div className="flex items-center">
                    <img className="w-5 h-5 mr-3" src={pageIcon} alt="page-icon" />
                    <p className="text-sm font-semibold">頁面標題</p>
                </div>
                <img className="w-5 h-5 opacity-0 group-hover:opacity-80" src={backIcon} alt="back-icon" />
            </div>
        )  
    }
    const SearchTypeh =({src,alt,content})=> {
        return(
            <div className="flex flex-nowrap items-center border rounded-2xl py-0.5 px-2 mr-1 min-w-max">
                <img className="w-5 h-5 p-0.5 mr-1" src={src} alt={alt} />
                <p className="whitespace-nowrap text-sm text-gray-500">{content}</p>
                <img className="w-5 h-5 p-0.5 mr-1" src={downMenu} alt="down-menu" />
            </div>
        )
    }  

    return(
        <div>
            <div onClick={handleToggle} className="QuickFind flex items-center point py-1 px-3" >
                <img src={search} alt="seach" className="QuickFind w-5 h-5 p-0.5 mr-2"/>
                <p className="QuickFind text-sm font-semibold text-gray-600">Quick find</p>
            </div>  
            {isQuickFind && <div onClick={handleToggle}  className="QuickFind absolute bg-gray-500 bg-opacity-30 w-screen top-0 bottom-0 left-0 flex-grow">
                <div className="relative  w-6/12 h-3/6 m-auto top-40 left-10 right-10 bg-white opacity-100 rounded-lg">
                    <div className="px-5 py-3 flex items-center">
                        <img className="w-5 h-5 mr-3" src={search} alt="seach" />
                        <input type="text" placeholder="Search username's Notion..." onChange={handleChange} className="focus:outline-none w-full text-xl"/>
                    </div>
                    <hr />
                    <div className="flex px-5 py-3 overflow-x-auto">
                        <SearchTypeh  src={letter} alt="letter" content="Only search titles"/>
                        <SearchTypeh  src={searchUser} alt="search-user" content="Created by"/>
                        <SearchTypeh  src={searchPage} alt="search-page" content="In page"/>
                        <SearchTypeh  src={calendar} alt="calendar" content="Date"/>
                    </div>

                    <div className="h-4/6 overflow-x-hidden overflow-y-auto px-1 py-1">
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-500 px-4">Today</p>
                            <div>
                                <SearchPageList />
                                <SearchPageList />
                                <SearchPageList />
                                <SearchPageList />
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-500 px-4">Yesterday</p>
                            <div>
                                <SearchPageList />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 px-4">Past Week</p>
                            <div>
                                <SearchPageList />
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center overflow-x-hidden px-5 py-1 mt-auto border-t">
                        <div className="flex items-center mr-5 flex-nowrap">
                            <img className="w-5 h-5 p-1" src={backIcon} alt="back-icon" />
                            <p className="text-sm text-gray-400">Open</p>
                        </div>
                        <div className="flex items-center flex-nowrap">
                            <p className="text-sm text-gray-400 whitespace-nowrap -mr-1.5">⌘</p>
                            <img className="w-5 h-5 p-1" src={backIcon} alt="back-icon" />
                            <p className="text-sm whitespace-nowrap text-gray-400">Open in a new tab</p>
                        </div>
                        
                    </div>
                </div>
            </div>}
        </div>
        
        
    )

}