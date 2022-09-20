import React from "react";
import Share from "./Share";
import More from "./More";
import Title from "./Title";
import menu from "../image/menu.png";
import emptyStar from "../image/empty-star.png";
import fullStar from "../image/full-star.png";
import MenuButton from "./MenuButton";
import { usePages } from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import {useFavorite,useFavoriteUpdate} from "../../Hooks/Favorite"

export default function Header({isSide,toggleSide,onEmojiClick,}) {
	const pages = usePages();
	const currentPageId = useCurrentPageId();
	const favorite = useFavorite();
	const changeFavorite = useFavoriteUpdate();
	const pageItem = pages.filter((item) => {
		return item.id === currentPageId;
	});
	const pageTitle = pageItem[0]?.title;
	const pageIcon = pageItem[0]?.icon;

	return (
		<div className="flex h-12 justify-between px-2 leading-10 relative">
			<div className="flex ">
				{!isSide && (
					<div className="flex items-center">
						<MenuButton
							className="sidebarButton"
							handleClick={toggleSide}
							alt="sidebarButton"
							src={menu}
						/>
					</div>
				)}
				<div className="flex items-center">
					<Title
						pageTitle={pageTitle}
						pageIcon={pageIcon}
						onEmojiClick={onEmojiClick}
					/>
				</div>
			</div>
			<div className="flex">
				<Share />
				<div className="flex items-center">
					<MenuButton
						className="IsFavorite"
						handleClick={changeFavorite}
						alt="favoriteButton"
						src={favorite ? fullStar : emptyStar}
					/>
				</div>
				<More  />
			</div>
		</div>
	);
}
