import React from "react";
import PageList from "./PageList";

export default function Private(props) {
	return (
		<div>
			<PageList page={props.page} />
		</div>
	);
}
