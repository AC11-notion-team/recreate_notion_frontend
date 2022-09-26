import React,{useState,useEffect} from "react";
import { usePages } from "../../Hooks/Pages";
import Page from "./Page";
import { useCurrentPageUpdate } from "../../Hooks/CurrentPage";

export default function Star({toggleFavorite,onEmojiClick}) {
	const pages = usePages();
	const [favoritePages,setFavoritePages] = useState([])
	const changeCurrentPage = useCurrentPageUpdate();
	useEffect(()=>{
		setFavoritePages(
			pages.filter(item =>
				 item.favorite === true
			)
		)
	},[pages])
	const handleChangeCurrentPage = (page) => {
		console.log(page)
		changeCurrentPage(page)
	}
	return (
		<div>
			{favoritePages?.length>0 ?<div>
					<div className="py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">
							FAVORITES
						</p>
					</div>
					{favoritePages?.map((page) => (
						<Page
							key={page.id}
							onEmojiClick={onEmojiClick}
							handleChangeCurrentPage = {() => handleChangeCurrentPage(page)}
							page={page}
							toggleFavorite={toggleFavorite}
						/>
					))}

				</div>:null}
		</div>
	);
}
