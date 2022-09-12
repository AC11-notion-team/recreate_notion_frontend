import React from "react";

const ShareToParticularPerson = () => {
	return (
		<div className="flex p-1 m-2 items-center justify-between flex-nowrap ">
			<input
				type="text"
				className="flex-nowrap share-Universal text-left boredr-1 mr-2 share-like-input point min-w-min overflow-x-hidden w-full"
				placeholder="Add emails,people,integratons..."
			/>
			<button className="share-Universal button-bg">
				<p className="leading-5 text-white whitespace-nowra overflow-x-hidden">
					Invite
				</p>
			</button>
		</div>
	);
};

export default ShareToParticularPerson;
