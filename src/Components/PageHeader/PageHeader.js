import React, { useState } from "react";
import { usePages, usePagesUpdate } from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import Emoji from "../Navbar/EmojiPicker";

import aws from "aws-sdk";
import axios from "axios";
import { useEffect } from "react";

function PageHeader({ onEmojiClick }) {
	const bucketName = process.env.REACT_APP_S3BUCKET;
	const region = process.env.REACT_APP_S3REGION;
	const accessKeyId = process.env.REACT_APP_S3ACCESSKEY;
	const secretAccessKey = process.env.REACT_APP_S3SECRETACCESSKEY;
	const baseUrl = process.env.REACT_APP_BASEURL;

	const S3Client = new aws.S3({
		region,
		accessKeyId,
		secretAccessKey,
		signatureVersion: "v4",
	});
	const pages = usePages();
	const currentPageId = useCurrentPageId();
	const pageItem = pages.filter((item) => {
		return item.id === currentPageId;
	});
	const pageTitle = pageItem[0]?.title;
	const pageIcon = pageItem[0]?.icon;
	const pageCover = pageItem[0]?.cover;
	const [cover, setCover] = useState("");
	useEffect(() => {
		setCover(pageCover);
	}, [currentPageId]);

	const upload = async (file) => {
		let files = file.target.files[0];
		const params = {
			Bucket: bucketName,
			Key: files.name,
			Expires: 60,
		};
		const url = await S3Client.getSignedUrlPromise("putObject", params);
		axios
			.put(url, {
				body: files,
			})
			.then(function (result) {
				var signedUrl = result.config.url;

				var options = {
					headers: {
						"Content-Type": files.type,
					},
				};
				return axios.put(signedUrl, files, options);
			})
			.then(function (result) {
				setCover("");
				axios({
					method: "put",
					url: `${baseUrl}/pages/${currentPageId}/cover`,
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer " + localStorage.getItem("zettel_user_token"),
					},
					params: {
						coverUrl: result.config.url.split("?")[0],
					},
				}).then((res) => {
					setCover(res.data.message);
				});
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	return (
		<div className="group">
			<div className="relative ">
				<label
					htmlFor="coverImg"
					className="absolute px-1 py-0.5 text-sm bg-white border rounded right-5 bottom-2 z-10"
				>
					change cover
					<input
						id="coverImg"
						type="file"
						className="hidden w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
						onChange={upload}
					/>
				</label>

				<section class="w-full relative ">
					{cover && (
						<img
							src={cover}
							className="object-cover w-full h-48 overflow-hidden"
							alt="cover"
						/>
					)}
					{cover && (
						<div className="absolute mb-2 ml-3 text-6xl cursor-pointer left-44 -bottom-7">
							<Emoji
								currentPageID={currentPageId}
								pageIcon={pageIcon}
								onEmojiClick={onEmojiClick}
							/>
						</div>
					)}
				</section>
			</div>
			<div className="w-auto mx-20 mt-8 mb-16">
				<div className="relative flex items-center w-4/6 max-w-screen-sm m-auto">
					{!cover && (
						<div className="mb-2 mr-3 text-4xl cursor-pointer left-44 -bottom-7">
							<Emoji
								currentPageID={currentPageId}
								pageIcon={pageIcon}
								onEmojiClick={onEmojiClick}
							/>
						</div>
					)}

					<input
						className="w-3/4 text-4xl font-bold outline-none"
						placeholder="Untitled"
						onChange={(event) => onEmojiClick(event, currentPageId)}
						id={currentPageId}
						value={pageTitle || ""}
					/>
				</div>
			</div>
		</div>
	);
}

export default PageHeader;
