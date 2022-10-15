import React,{useState, useEffect} from "react";
import search from "../image/search.png"
import axios from 'axios';
import {useCurrentPageUpdate } from "../../Hooks/CurrentPage";


export default function QuickFind(){
	const changeCurrentPageId = useCurrentPageUpdate();

    const [isQuickFind, setIsQuickFind] = useState(false);
    const handleToggle = (e) => {
        if(e.target.className.includes("QuickFind") === true){
            setIsQuickFind(prevQuickFind => !prevQuickFind)
            
        }
        
        
    };
    useEffect(()=>{
        if (isQuickFind===false){
            setkeyword([])
            setSearchText("")
        }
    },[isQuickFind])
    const [searchText,setSearchText] = useState("")
    const baseUrl = process.env.REACT_APP_BASEURL
    const [Keyword,setkeyword] = useState([])
    const handleChange = (event) => {
        setSearchText(event.target.value)
        axios({
            method:"get",
            url:`${baseUrl}/users/search_page.json`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
            },
            params:{
                search: event.target.value
            }
            }).then((res)=>{
                setkeyword(res.data.pages)
            }).catch((err) => {
                console.error(err);
            });
    };

    function page (pageid){
        changeCurrentPageId(pageid)
        setIsQuickFind(false)
        setkeyword([])
    }
            
            
    const SearchPageList = (props) => {
        return(
            
            <div className="flex items-center justify-between py-2 px-4 point group" 
            onClick={()=>page(props.pageId)}>
                <div className="flex items-center" >
                    <p className="text-sm font-semibold ">{props.pageIcon? props.pageIcon : "🗒️"}</p>
                    <p className="text-sm font-semibold ml-3 ">{props.pageTitle}</p>
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
                        <img className="w-5 h-5 mr-3" src={search} alt="seach" value={searchText} />
                        <input type="text" placeholder="Search username's Notion..." onChange={handleChange} className="focus:outline-none w-full text-xl" value={searchText}/>
                    </div>
                    <hr />
                    <div className="h-4/6 overflow-x-hidden overflow-y-auto px-1 py-1">
                        <div className="mb-3">
                            {
                                Keyword?.map((page)=>{
                                    return <SearchPageList pageTitle={page.title} pageIcon={page.icon} key={page.id} pageId={page.id} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </div>
        
        
    )

}