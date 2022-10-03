import React, { useState, useCallback} from "react";
import { useCurrentPage, useCurrentPageUpdate } from "../../Hooks/CurrentPage";
import { useHandlePageUpdate } from "../../Hooks/Pages"
import Emoji from "../Navbar/EmojiPicker";
import PageHeaderWithCover from "./PageHeaderWithCover"
import aws from "aws-sdk";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";

function PageHeader() {
	const bucketName = process.env.REACT_APP_S3BUCKET;
	const region = process.env.REACT_APP_S3REGION;
	const accessKeyId = process.env.REACT_APP_S3ACCESSKEY;
	const secretAccessKey = process.env.REACT_APP_S3SECRETACCESSKEY;
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [isChangeCover, setIsChangeCover] = useState(()=> false)
	const updateCurrentPage =	useCurrentPageUpdate()
	const showButton = () => setIsChangeCover(true)
	const closeButton = () => setIsChangeCover(false)
	const currentPage = useCurrentPage();
	const handlePageUpdate = useHandlePageUpdate()
	const { id: currentPageId, title, icon: pageIcon, cover} = currentPage
	const [loading, setLoading] = useState(()=> false);


	const handleChangeCover = (imageUrl)=>{
		updateCurrentPage({...currentPage, cover: imageUrl})
	}

	const handleEditEmoji = (e, emojiObject) => handlePageUpdate({...currentPage, icon: emojiObject.emoji})


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
	
	const upload = useCallback(async (file) => {
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
					handleChangeCover(res.data.message);
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	}, [currentPageId]);

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
					
					<div className= { cover ? " absolute mb-28 text-6xl cursor-pointer" : "mb-2 mr-3 text-4xl cursor-pointer left-44 -bottom-7"}>
						<Emoji
							pageIcon={pageIcon}
							handleEditEmoji={handleEditEmoji}
						/>
					</div>
						
					<input
						className="w-3/4 text-4xl font-bold outline-none"
						placeholder="Untitled"
						onChange={(e) => handlePageUpdate({...currentPage, title: e.target.value})}
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

export default React.memo(PageHeader);
