import React from "react";
import EditableBlock from "./Subunit/";
import Features from "./Subunit/Features.jsx";
import Slideshow from "./Subunit/Slideshow.jsx";
import StartNotion from "./Subunit/StartNotion.jsx";
import Resources from "./Subunit/Resources.jsx";

function Homepage() {
	return (
		<div className="Homepage">
			<EditableBlock />
			<Features />
			<Slideshow />
			<StartNotion />
			<Resources />
		</div>
	);
}

export default Homepage;
