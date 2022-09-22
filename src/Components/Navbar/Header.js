import React from "react";
import Share from "./Share/Share";
import More from "./More";
import Title from "./Title";
import menu from "../image/menu.png";
import emptyStar from "../image/empty-star.png";
import fullStar from "../image/full-star.png";
import MenuButton from "./MenuButton";
import { usePages } from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";

export default function Header({
	isSide,
	toggleFavorite,
	toggleSide,
	onEmojiClick,
}) {
	const pages = usePages();
	const currentPageId = useCurrentPageId();

	const pageItem = pages.filter((item) => {
		return item.id === currentPageId;
	});
	const pageTitle = pageItem[0]?.title;
	const pageIcon = pageItem[0]?.icon;
	const pageFavorite = pageItem[0]?.favorite;
	const callback =()=>{
		toggleFavorite(currentPageId)
	}

	return (
		<nav className="flex h-12 justify-between px-2 leading-10 relative">
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
				<div className="flex items-center" onClick={callback}>
					<MenuButton
						className="IsFavorite"
						alt="favoriteButton"
						src={pageFavorite ? fullStar : emptyStar}
					/>
				</div>
				<More favorite={pageFavorite} toggleFavorite={toggleFavorite} />
			</div>
		</nav>
	);
}
