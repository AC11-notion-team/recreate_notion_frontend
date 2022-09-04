import React, { useState, useEffect } from "react";
import user from "../image/user.png";
import pageButtonRight from "../image/pageButtonRight.png";
import addPage from "../image/plus.png";
import PageMore from "./PageMore";
import Emoji from "../Navbar/EmojiPicker";
import axios from "axios";
import Page from "./Page";

const PageList = ({ page }) => {
	const pages = [...page];
	return (
		<div className="py-1 px-1 ">
			{pages.map((ele) => {
				return <Page key={ele.id} />;
			})}
		</div>
	);
};
export default PageList;
