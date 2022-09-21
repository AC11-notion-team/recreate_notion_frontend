import React from "react";
import {useFavorite,useFavoriteUpdate} from "../../Hooks/Favorite"
import { usePages } from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import Page from "./Page";

export default function Star({onEmojiClick}) {
	const favorite = useFavorite();
	const pages = usePages();
	const currentPageId = useCurrentPageId();
	const changeFavorite = useFavoriteUpdate();

	return (
		<div>
			{favorite && (<div>
					<div className="py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">
							FAVORITES
						</p>
					</div>
					{pages.map((item) => (
						<Page
							key={item.id}
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
