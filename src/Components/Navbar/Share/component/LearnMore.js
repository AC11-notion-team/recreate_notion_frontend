import React from "react";
import question from "../../../image/question.png";
import link from "../../../image/link.png";

const LearnMore = () => {
	return (
		<div>
			<div className="p-2 flex justify-between">
				<div className="flex items-center p-1 point">
					<img src={question} alt="shareHelp" className="w-3 h-3 mr-2 " />
					<p className="text-xs text-gray-500">Learn about sharing</p>
				</div>
				<div className="flex items-center point p-1">
					<img src={link} alt="linkButton" className="w-4 h-4 mr-2" />
					<p className="text-xs overflow-x-hidden">Copy link</p>
				</div>
			</div>
		</div>
	);
};

export default LearnMore;
