import React,{useState,useEffect} from "react";
import { usePages } from "../../Hooks/Pages";
import Page from "./Page";

export default function Star({toggleFavorite,onEmojiClick}) {
	const pages = usePages();
	const [favoritePages,setFavoritePages] = useState([])

	useEffect(()=>{
		setFavoritePages(
			pages.filter(item =>
				 item.favorite === true
			)
		)
	},[pages])
	
	return (
		<div>
			{favoritePages?.length>0 ?<div>
					<div className="py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">
							FAVORITES
						</p>
					</div>
					{favoritePages?.map((item, i) => (
						<Page
							key={item.id}
							onEmojiClick={onEmojiClick}
							pageTitle={item.title}
							pageIcon={item.icon}
							pageID={item.id}
							pageFavorite={item.id}
							toggleFavorite={toggleFavorite}
						/>
					))}

				</div>:null}
		</div>
	);
}
