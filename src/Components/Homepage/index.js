import React from "react";
import EditableBlock from "./Subunit/";
import Features from "./Subunit/Features.js";
import Slideshow from "./Subunit/Slideshow.js";
import StartNotion from "./Subunit/StartNotion.js";
import Resources from "./Subunit/Resources.js";

function Homepage() {
	return (
		<div className="Homepage bg-[#fffefc]">
			<EditableBlock />
			<Features />
			<Slideshow />
			<StartNotion />
			<Resources />
		</div>
	);
}

export default Homepage;
