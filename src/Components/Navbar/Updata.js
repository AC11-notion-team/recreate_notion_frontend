import React from "react";
import UpdataImg from "../image/updata.png";
import MenuButton from "./MenuButton";

export default function Updata() {
	return (
		<div className="flex items-center">
			<MenuButton className="IsUpdata" alt="updata" src={UpdataImg} />
		</div>
	);
}
