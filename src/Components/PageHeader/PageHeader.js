import React, { useState} from "react";
import { usePages} from "../../Hooks/Pages";
import { useCurrentPageId } from "../../Hooks/CurrentPageId";
import Emoji from "../Navbar/EmojiPicker";
import PageHeaderWithCover from "./PageHeaderWithCover"
import aws from "aws-sdk";
import axios from "axios";
import { useEffect } from "react";
import CircleLoader from "react-spinners/CircleLoader";

function PageHeader({ onEmojiClick }) {
	const bucketName = process.env.REACT_APP_S3BUCKET;
	const region = process.env.REACT_APP_S3REGION;
	const accessKeyId = process.env.REACT_APP_S3ACCESSKEY;
	const secretAccessKey = process.env.REACT_APP_S3SECRETACCESSKEY;
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isChangeCover, setIsChangeCover] = useState(false)
	const [title, setTitle] = useState("")
	const showButton = () => setIsChangeCover(true)
	const closeButton = () => setIsChangeCover(false)
	const hanleEditTitle = (event)=>{
		onEmojiClick(event, currentPageId)
		setTitle(event.target.value)
	}
	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "red",
	};

	const S3Client = new aws.S3({
		region,
		accessKeyId,
		secretAccessKey,
		signatureVersion: "v4",
	});
	const pages = usePages();
	const currentPageId = useCurrentPageId();
	const [pageIcon, setPageIcon] = useState("");
	
	const [cover, setCover] = useState("");
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("#36d7b7");
	useEffect(() => {
		const pageItem = pages.filter((item) => {
			return item.id === currentPageId;
		});
		if(pageItem.length){
			setTitle(pageItem[0].title);
			setPageIcon(pageItem[0].icon);
			setCover(pageItem[0].cover);
		}
	}, [currentPageId, pages]);

	const upload = async (file) => {
		let files = file.target.files[0];
		if (files){
			setLoading(true);
		}
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
					setLoading(false);

					setCover(res.data.message);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	};

	return (
		<div onMouseEnter={showButton} onMouseLeave={closeButton}>
			{ cover
				? 
					<PageHeaderWithCover isChangeCover = {isChangeCover} cover = {cover} loading={loading} />
				
				: (
					<div className="relative w-full h-10" >
						{isChangeCover && (
							<label
								htmlFor="coverImg"
								className="absolute px-1 py-0.5 text-sm bg-white text-black border rounded right-5 bottom-2 z-10"
							>change cover</label>
						)}
						
						<CircleLoader
							color="#d69636"
							loading={loading}
							cssOverride={override}
							size={50}
						/>
					</div>
				)
			}

			
			<div className="w-auto mx-20 pt-8 pb-16">
				<div className="relative flex items-center w-4/6 max-w-screen-sm m-auto">
					{cover
						?(
							<div className=" absolute mb-28 text-6xl cursor-pointer">
								<Emoji
									currentPageID={currentPageId}
									pageIcon={pageIcon}
									onEmojiClick={onEmojiClick}
								/>
							</div>)
						:(
							<div className="mb-2 mr-3 text-4xl cursor-pointer left-44 -bottom-7">
								<Emoji
									currentPageID={currentPageId}
									pageIcon={pageIcon}
									onEmojiClick={onEmojiClick}
								/>
							</div>)
					}

					<input
						className="w-3/4 text-4xl font-bold outline-none"
						placeholder="Untitled"
						onChange={(event) => hanleEditTitle(event)}
						value={title}
					/>
					<input
						id="coverImg"
						type="file"
						className="hidden"
						onChange={upload}
					/>
				</div>
			</div>
		</div>
	);
}

export default PageHeader;
