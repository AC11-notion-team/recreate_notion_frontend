import React from "react";
import pencil from "../../../image/pencil.png";
import { Switch } from "@headlessui/react";

const ShareLink = ({ inviteUrl, editable, handleEditable }) => {
	const copyToClipBoard = () => {
		navigator.clipboard.writeText(inviteUrl);
	};
	return (
		<div className="point">
			<div className="">
				<div className="relative flex mx-3 mt-1 mb-0">
					<input
						type="text"
						id="disabled-input"
						aria-label="disabled input"
						class="mb-0 px-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={inviteUrl}
						disabled
					/>

					<button
						type="submit"
						className=" absolute right-1.5  top-0.5   bg-gray-300 hover:bg-gray-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={copyToClipBoard()}
					>
						Copy
					</button>
				</div>
				<div className="flex justify-between content-center items-center pb-2 pt-0 pl-5 px-3">
					<div className="flex items-center">
						<div className="pr-3">
							<img
								className="flex content-center justify-center  w-5 h-5"
								src={pencil}
								alt="editable"
							/>
						</div>
						<div className="flex items-center">editable</div>
					</div>

					<div className="flex content-center">
						<Switch
							checked={editable[1]}
							onChange={handleEditable}
							className={`${
								editable[1] ? "button-bg" : "bg-gray-200"
							} relative inline-flex h-6 w-11 items-center rounded-full`}
						>
							<span className="sr-only">Enable notifications</span>
							<span
								className={`${
									editable[1] ? "translate-x-6" : "translate-x-1"
								} inline-block h-4 w-4 transform rounded-full bg-white transition`}
							/>
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareLink;
