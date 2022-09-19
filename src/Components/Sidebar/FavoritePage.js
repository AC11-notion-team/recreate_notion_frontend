import React from "react";
import {useFavorite,useFavoriteUpdate} from "../../Favorite"
import { usePages } from "../../Pages";
import { useCurrentPageId } from "../../CurrentPageId";
import Page from "./Page";

export default function Star({onEmojiClick}) {
	const favorite = useFavorite();
	const pages = usePages();
	const currentPageId = useCurrentPageId();
	const changeFavorite = useFavoriteUpdate();

	console.log(pages);

	
	return (
		<div>
			{favorite && (<div>
					<div className="py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">
							FAVORITES
						</p>
					</div>
					{pages.map((item, i) => (
						<Page
							key={i}
							onEmojiClick={onEmojiClick}
							pageTitle={item.title}
							pageIcon={item.icon}
							pageID={item.id}
							pageFavorite={item.id}
						/>
					))}

				</div>)}
		</div>
	);
}
