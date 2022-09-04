import React, { useState, useEffect } from "react";

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
