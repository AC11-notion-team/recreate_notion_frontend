import React from "react";
import pencil from "../../../image/pencil.png";

const ShareLink = () => {
	return (
		<div className="point">
			<div className="">
				<div className="flex mb-0 mt-1 mx-3     relative">
					<input
						type="text"
						id="disabled-input"
						aria-label="disabled input"
						class="mb-0 px-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value="Disabled input"
						disabled
					/>

					<button
						type="submit"
						class="text-white absolute right-1.5  top-0.5   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Copy
					</button>
				</div>
				<div className="flex justify-between content-center items-center pb-2 pt-0 pl-5 px-3 pl-2     ">
					<div className="flex items-center">
						<div className="pr-3">
							<img
								className=" block flex content-center justify-center  w-5 h-5"
								src={pencil}
								alt="editable"
							/>
						</div>
						<div className="flex items-center">editable</div>
					</div>

					<div className="flex content-center">
						<label
							for="default-toggle1"
							class="inline-flex relative items-center cursor-pointer"
						>
							<input
								type="checkbox"
								value=""
								id="default-toggle1"
								class="sr-only peer"
							></input>
							<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareLink;
