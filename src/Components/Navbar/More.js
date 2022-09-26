import React,{useState} from "react";
import more from "../image/more.png"
import link from "../image/link.png"
import trash from "../image/delete.png"
import MenuButton from "./MenuButton";
import ActionButton from "./ActionButton"
import emptyStar from "../image/empty-star.png"
import fullStar from "../image/full-star.png"
import { useCurrentPage ,useCurrentPageUpdate  } from "../../Hooks/CurrentPage";
import { usePagesUpdate } from "../../Hooks/Pages";
import axios from "axios";

export default function More({favorite,toggleFavorite}){
    const [isMore,setIsMore] = useState(false)
    const handleToggle = (e) => {
        if(e.target.className.includes("IsMore") === true){
            setIsMore(prevMore => !prevMore)
        }
    };
    const { id: currentPageId } = useCurrentPage();
    const baseUrl = process.env.REACT_APP_BASEURL;

	const changePages = usePagesUpdate();
	const changeCurrentPageId = useCurrentPageUpdate();
    let prevId =""
	const removePage = () => {
		axios({
			method: "delete",
			url: `${baseUrl}/pages/${currentPageId}/delete_page`,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("zettel_user_token"),
			},
		}).then((res) => {
			changePages((prevPages) => {
				return prevPages.filter((item) => {
					if(item.id !== currentPageId){
						prevId = item.id
					}else{
						changeCurrentPageId(prevId)
					}
					return item.id !== currentPageId
					
				});
			});
		})
	};
    const callback =()=>{
		toggleFavorite(currentPageId)
	}
    
    return(
        <div className="flex items-center">
            <MenuButton className="IsMore" handleClick={handleToggle} alt="moreButton"  src={more} />

            {isMore&& <div onClick={handleToggle}  className="IsMore fixed  w-screen top-0 bottom-0 left-0 z-20">
                <div className="absolute w-60 bg-white border-2 box-shadow right-4 top-12 rounded-md p-1.5">
                    <ActionButton src={favorite ? fullStar:emptyStar} alt="favorite" content={favorite ? "Remove from Favorites":"Add to Favorites"} className="py-0.5" handleClick={callback} />
                    <ActionButton src={trash} alt="delete" content="Delete" className="py-0.5" handleClick={removePage}/>
                </div>
            </div>}
        </div>
    )
}