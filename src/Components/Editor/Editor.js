import React, {useRef, useEffect, useCallback} from "react";
import EditorJS from '@editorjs/editorjs';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter'
import DragDrop from 'editorjs-drag-drop';
import Embed from '@editorjs/embed';
import EditorjsCodeflask from '@calumk/editorjs-codeflask';
import Footnotes from '@editorjs/footnotes';
import Header from '@editorjs/header'; 
import ImageTool from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link';
import LinkPage from './LinkPage/link-page.js'
import Marker from '@editorjs/marker';
import NestedList from '@editorjs/nested-list';
import Quote from '@editorjs/quote';
import Underline from '@editorjs/underline';
import Table from '@editorjs/table';
import TextVariantTune from '@editorjs/text-variant-tune';
import aws from 'aws-sdk';
import axios from 'axios';
import { useCurrentPage, useCurrentPageChange } from "../../Hooks/CurrentPage";
import { usePagesUpdate } from "../../Hooks/Pages";
import { useNavigate } from "react-router-dom"

const bucketName = process.env.REACT_APP_S3BUCKET;
const region = process.env.REACT_APP_S3REGION;
const accessKeyId = process.env.REACT_APP_S3ACCESSKEY;
const secretAccessKey = process.env.REACT_APP_S3SECRETACCESSKEY;
const S3Client = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: "v4",
});
const baseUrl = process.env.REACT_APP_BASEURL;

const EDITTOR_HOLDER_ID = "editorjs";
function Editor() {
	const {id: currentPageId}= useCurrentPage();
	const changeCurrentPage = useCurrentPageChange();
	const changePages = usePagesUpdate();
	const ejInstance = useRef();
	const Navigate = useNavigate();
	const token = `Bearer ${localStorage.getItem("zettel_user_token") || null}`;
	// const wsReceivedData = useWsReceivedData();
	let isAddPageLink = false;

	const initEditor = useCallback((initialData, readOnly) => {
		const editor = new EditorJS({
			holder: EDITTOR_HOLDER_ID,
			logLevel: "ERROR",
			data: initialData,
			inlineToolbar: true,
			readOnly: readOnly,
			placeholder: "Let`s write an awesome story!",
			onReady: () => {
				ejInstance.current = editor;
				new DragDrop(editor);
			},
			onChange: async (api, event) => {
				let content = await editor.save();
				// Put your logic here to save this data to your DB
				if (event.type === "block-removed" && !event.detail.target.isEmpty) {
				const config = {
					method: "delete",
					url: `${baseUrl}/pages/delete_data`,
					headers: {
					"Content-Type": "application/json",
					Authorization: token,
					},
					data: {
					page_id: currentPageId ,
					block_id: event.detail.target.id,
					},
				};
				axios(config)
					.then((res) => res)
					.catch((err) => console.error(err));
				return
				}
				if (event.type !== "block-removed") {
				const config = {
					method: "post",
					url: `${baseUrl}/pages/${currentPageId}/save_data`,
					headers: {
					"Content-Type": "application/json",
					Authorization: token,
					},
					data: {
					api: content,
					},
				};
				axios(config)
					.then((res) => res)
					.catch((err) => console.error(err));
				}
				if (event.type === "block-added" && event.detail.target.name === "linkpage"){
					isAddPageLink = true
				}
				if (isAddPageLink && event.type === "block-changed" && event.detail.target.name === "linkpage"){
					const block = content.blocks.filter(block => block.id === event.detail.target.id)[0]?.data
					const newPage = block.meta
					if (newPage){
						isAddPageLink = false
						changePages(prevPages => [...prevPages, newPage])
						changeCurrentPage(newPage)
					}
				}
			},

			autofocus: false,
			tools: {
				checklist: {
					class: Checklist,
					inlineToolbar: true,
				},
				code: EditorjsCodeflask,
				embed: Embed,
				delimeter: Delimiter,
				footnotes: Footnotes,
				header: {
					class: Header,
					inlineToolbar: true,
					config: {
						placeholder: "Enter a header",
					},
				},
				image: {
				class: ImageTool,
				config:{
					endpoints: {
					byUrl: `${baseUrl}/uploadImageByUrl`,
					},
					additionalRequestHeaders:{
					Authorization: token,
					},
					uploader: {
					/**
					 * Upload file to the server and return an uploaded image data
					 */
					async uploadByFile(file){
						// your own uploading logic here  
						const ranBytes = Math.floor(Math.random()*10000000000000)
						const imageName = ranBytes.toString()
						const params = {
							Bucket: bucketName,
							Key: imageName,
							Expires: 60
						}
						const url = await S3Client.getSignedUrlPromise('putObject', params)
						
						return fetch(url, {
							method: "PUT",
							headers: {
								"Content-Type": "image/*",
							},
							body: file
						}).then((res)=>{ 
							return {
								success: 1,
								file: {
									url: res.url.split('?')[0],
									// any other image data you want to store, such as width, height, color, extension, etc
								}
							}
						}).catch(err => console.error("fetch_image_error" + err))
					},
					},
				},
				},

				inlineCode: InlineCode, 
				
				link:{
				class: LinkTool,
				config: {
					endpoint: `${baseUrl}/fetch`,
					headers:{
					Authorization: token,
					},
				},
				},

				link: {
					class: LinkTool,
					config: {
						endpoint: `${baseUrl}/fetch`,
						headers: {
							Authorization: `Bearer ${
								localStorage.getItem("zettel_user_token") || null
							}`,
						},
					},
				},

				linkpage: {
					class: LinkPage,
				},

				marker: {
					class: Marker,
				},

				list: {
					class: NestedList,
					inlineToolbar: true,
					config: {
						placeholder: "List",
					},
				},

				quote: {
					class: Quote,
					inlineToolbar: true,
				},

				underline: {
					class: Underline,
				},

				table: {
					class: Table,
					inlineToolbar: true,
					config: {
						withHeadings: true,
					},
				},

				textVariant: TextVariantTune,
			},
		});
	},[currentPageId]);

	useEffect(() => {
		const config = {
			method: "get",
			url: `${baseUrl}/pages/${currentPageId}.json`,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};
		if (currentPageId) {
			axios(config)
				.then((res) => {
					const initialData = {
						time: Date.now(),
						blocks: res.data.blocks,
					};
          			const readOnly =  !(res.data.editable || res.data.user_auth)
					if (!ejInstance.current) {
						initEditor(initialData, readOnly);
					}
				})
				.catch((err) => {
					console.error(err)
					localStorage.setItem("currentPageId", "")
					Navigate("/unknown-page")
				});
		}

		return () => {
		ejInstance.current?.destroy();
		ejInstance.current = null;
		};
	}, [currentPageId, token, initEditor]);

	// useEffect(() => {
	// 	if (wsReceivedData) {

	//     ejInstance.current?.destroy();
	//     ejInstance.current = null;
	//     if (!ejInstance.current) {
	//       const initialData = {
	//         time: Date.now(),
	//         blocks: wsReceivedData,
	//       };

	//       initEditor(initialData);
	//     }
	//   }

	//   return () => {

	//     ejInstance.current?.destroy();
	//     ejInstance.current = null;
	//   };
	// }, [wsReceivedData, initEditor]);

	return (
		<div>
			<div id={EDITTOR_HOLDER_ID}> </div>
		</div>
	);
}

export default Editor;
