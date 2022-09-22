import React,{useState} from "react";
import search from "../image/search.png"
import pageIcon from "../image/page.png"

 
export default function QuickFind(){
    const [isQuickFind, setIsQuickFind] = useState(false);
    const handleToggle = (e) => {
        if(e.target.className.includes("QuickFind") === true){
            setIsQuickFind(prevQuickFind => !prevQuickFind)
        }
    };
    const [isSearchText,setIsSearchText] = useState("")
    const handleChange = (event) =>(setIsSearchText(event.target.value))
    const SearchPageList = () => {
        return(
            <div className="flex items-center justify-between py-2 px-4 point group">
                <div className="flex items-center">
                    <img className="w-5 h-5 mr-3" src={pageIcon} alt="page-icon" />
                    <p className="text-sm font-semibold">頁面標題</p>
                </div>
            </div>
        )  
    }
 

    return(
        <div>
            <div onClick={handleToggle} className="QuickFind flex items-center point py-1 px-3 mb-5" >
                <img src={search} alt="seach" className="QuickFind w-5 h-5 p-0.5 mr-2"/>
                <p className="QuickFind text-sm font-semibold text-gray-600">Quick find</p>
            </div>  
            {isQuickFind && <div onClick={handleToggle}  className="QuickFind absolute bg-gray-500 bg-opacity-30 w-screen top-0 bottom-0 left-0 flex-grow z-20">
                <div className="relative  w-5/12 h-2/5 m-auto top-40 left-10 right-10 bg-white opacity-100 rounded-lg">
                    <div className="px-5 py-3 flex items-center">
                        <img className="w-5 h-5 mr-3" src={search} alt="seach" value={isSearchText} />
                        <input type="text" placeholder="Search Pages ..." onChange={handleChange} className="focus:outline-none w-full text-xl"/>
                    </div>
                    <hr />
                    <div className="h-5/6 overflow-x-hidden overflow-y-auto px-1 py-1">
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-500 px-4">Today</p>
                            <div>
                                <SearchPageList />
                                <SearchPageList />
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-500 px-4">Yesterday</p>
                            <div>
                                <SearchPageList />
                                <SearchPageList />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 px-4">Past Week</p>
                            <div>
                                <SearchPageList />
                                <SearchPageList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
        
        
    )

}