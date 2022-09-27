import React from "react";
import Share from "./Share/Share";
import More from "./More";
import Title from "./Title";
import menu from "../image/menu.png";
import emptyStar from "../image/empty-star.png";
import fullStar from "../image/full-star.png";
import MenuButton from "./MenuButton";
import { useCurrentPage, useCurrentPageUpdate } from "../../Hooks/CurrentPage";

export default function Header({
	isSide,
	toggleSide,
}) {
	const currentPage = useCurrentPage()
	const {favorite: pageFavorite} = currentPage;
	const changeCurrentPage = useCurrentPageUpdate();
	const handleFavorite = () =>{
		changeCurrentPage({...currentPage, favorite: !pageFavorite})
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
					<Title/>
				</div>
			</div>
			<div className="flex">
				<Share />
				<div className="flex items-center" onClick={handleFavorite}>
					<MenuButton
						className="IsFavorite"
						alt="favoriteButton"
						src={pageFavorite ? fullStar : emptyStar}
					/>
				</div>
				< More />
			</div>
		</nav>
	);
}
