import React, {useRef, useState, useEffect} from "react";
import EditorJS from '@editorjs/editorjs';
import Code from '@editorjs/code';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter'
import DragDrop from 'editorjs-drag-drop';
import Embed from '@editorjs/embed';
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
import { useCurrentPageId } from "../../CurrentPageId";

const bucketName = process.env.REACT_APP_S3BUCKET;
const region = process.env.REACT_APP_S3REGION;
const accessKeyId = process.env.REACT_APP_S3ACCESSKEY;
const secretAccessKey = process.env.REACT_APP_S3SECRETACCESSKEY;
const S3Client = new aws.S3({region, accessKeyId, secretAccessKey, signatureVersion: 'v4'});
const baseUrl = process.env.REACT_APP_BASEURL;


const EDITTOR_HOLDER_ID = "editorjs";
function Editor() {
	
	const ejInstance = useRef();
	const [editorData, setEditorData] = useState("");
	const currentPageId = useCurrentPageId();
  console.log(currentPageId)
	useEffect(() => {
    console.log("useEffect")
		const config = {
			method: "get",
			url: `${baseUrl}/pages/${currentPageId}.json`,
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + localStorage.getItem("zettel_user_token") || null,
			},
		};
		if (currentPageId) {
			axios(config)
				.then((res) => {
					const initialData = {
						time: Date.now(),
						blocks: res.data.blocks,
					};
					setEditorData(initialData);
					if (!ejInstance.current) {
						initEditor(initialData);
					}
				})
				.catch((err) => console.error(err));
      }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
	}, [currentPageId]);

	const initEditor = (initialData) => {
		const editor = new EditorJS({
			holder: EDITTOR_HOLDER_ID,
			logLevel: "ERROR",
			data: initialData,
			inlineToolbar: true,
			placeholder: "Let`s write an awesome story!",
			onReady: () => {
				ejInstance.current = editor;
				new DragDrop(editor);
			},
			onChange: async (api, event) => {
				let content = await editor.save();
				// Put your logic here to save this data to your DB
				if (event.type == "block-removed" && !event.detail.target.isEmpty) {
					console.log(event);
					const config = {
						method: "delete",
						url: `${baseUrl}/pages/delete_data`,
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("zettel_user_token") || null,
						},
						data: {
							page_id: { currentPageId },
							block_id: event.detail.target.id,
						},
					};
					axios(config)
						.then((res) => res)
						.catch((err) => console.error(err));
				}
				if (event.type !== "block-removed") {
					const config = {
						method: "post",
						url: `${baseUrl}/pages/${currentPageId}/save_data`,
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("zettel_user_token") || null,
						},
						data: {
							title: "sssssss",
							page_id: {currentPageId},
							icon: "",
							cover: "wwwwwwwww",
							api: content,
						},
					};
					axios(config)
						.then((res) => res)
						.catch((err) => console.error(err));
				}

        setEditorData(content);
      },
      autofocus: false,
      tools: { 

        checklist:{
          class: Checklist,
          inlineToolbar:true,
        },

        code:{
          class: Code,
          inlineToolbar:true,
        },

        embed: Embed,

        delimeter: Delimiter,

        footnotes: Footnotes,

        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a header',
          },
        },

        image: {
          class: ImageTool,
          config:{
            endpoints: {
              byUrl: `${baseUrl}/uploadImageByUrl`,
            },
            additionalRequestHeaders:{
              Authorization: "Bearer " + localStorage.getItem("zettel_user_token") || null,
            },
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               */
              async uploadByFile(file){
                // your own uploading logic here  
                const ranBytes = Math.floor(Math.random()*10000000000000)
                const imageName = ranBytes.toString()
                console.log(bucketName)
                const params = {
                  Bucket: bucketName,
                  Key: imageName,
                  Expires: 60
                }
                const url = await S3Client.getSignedUrlPromise('putObject', params)
                
                return fetch(url, {
                    method: "PUT",
                    headers: {
                      // "Content-Type": "image/*",
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
                  }).catch(err => console.log("fetch_image_error" + err))
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
              Authorization: "Bearer " + localStorage.getItem("zettel_user_token") || null,
            },
          },
        },

        linkpage: {
          class: LinkPage,
        },

        marker:{
          class: Marker,
        },

        list:{
          class: NestedList,
          inlineToolbar: true,
          config: {
            placeholder: 'List',
          },
        },

        quote:{
          class: Quote,
          inlineToolbar:true,
        },

        underline:{
          class: Underline,
        },

        table:{
          class: Table,
          inlineToolbar: true,
          config:{
            withHeadings: true,
          }
        },

        textVariant: TextVariantTune,

      }, 
    });
  };
  
  return (
    <div className="relative content overflow-auto ">
      <React.Fragment>
          <div  id={EDITTOR_HOLDER_ID}> </div>
          {/* <button onClick= {()=> console.log(editorData)}> data</button> */}
      </React.Fragment>
    </div>
  );
}

export default Editor