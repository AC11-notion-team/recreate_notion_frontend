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
import Marker from '@editorjs/marker';
import NestedList from '@editorjs/nested-list';
import Quote from '@editorjs/quote';
import Underline from '@editorjs/underline';
import Table from '@editorjs/table';
import TextVariantTune from '@editorjs/text-variant-tune';
import aws from 'aws-sdk';
import axios from 'axios';

const bucketName = process.env.REACT_APP_S3BUCKET;
const region = process.env.REACT_APP_S3REGION;
const accessKeyId = process.env.REACT_APP_S3ACCESSKEY;
const secretAccessKey = process.env.REACT_APP_S3SECRETACCESSKEY;
const S3Client = new aws.S3({region, accessKeyId, secretAccessKey, signatureVersion: 'v4'});

const DEFAULT_INITIAL_DATA = () => {
    return {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "This is my awesome editor!",
            "level": 1
          }
        },
        {
          "type": "image",
          "data": {
            "file": {
              "url": "https://img.kocpc.com.tw/2018/12/1545287991-2b91dabdba15918b6cf95949a67f41c8.jpg",
            },
            "caption" : "Roadster // tesla.com",
            "withBorder" : false,
            "withBackground" : false,
            "stretched" : false
          }
        },
        {
          "type": "link",
          "data": {
            "link": "https://www.google.com/search?q=react&sxsrf=ALiCzsauetnFkf9gsiDrSEo5gIaLcllhbg:1661410008491&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi-mYfLsuH5AhWGat4KHWInDg0Q_AUoAnoECAIQBA&biw=1920&bih=1001&dpr=2#imgrc=viJ6CsTiT3pOsM",
            "meta": {
              "title" : "CodeX Team",
            },
          }
        },
      ]
    }
}

const EDITTOR_HOLDER_ID = 'editorjs';

function Editor() {
    const ejInstance = useRef();
    const [editorData, setEditorData] = useState("");
      

    useEffect(()=>{
      const config = {
        method: "get",
        url: `http://localhost:3000/api/v1/pages/8abe36ff-a465-4660-b980-9c7261a1dfdb.json`,
        headers:{
          Authorization: "Bearer " + localStorage.getItem("zettelk_user_token") || null,
        },
      } 
      axios(config)
      .then(res => {
        const initialData = {
          "time": Date.now(),
          "blocks": res.data.blocks
        }
        setEditorData(initialData)
        if (!ejInstance.current) {
            initEditor(initialData);
        }
      })
      .catch(err => console.error(err))

      return () => {
          ejInstance.current.destroy();
          ejInstance.current = null;
      }
    }, [])

    const initEditor = (initialData) => {
      const editor = new EditorJS({
        holder: EDITTOR_HOLDER_ID,
        logLevel: "ERROR",
        data: initialData,
        inlineToolbar: true,
        placeholder:'Let`s write an awesome story!',
        onReady: () => {
          ejInstance.current = editor;
          new DragDrop(editor);
        },
        onChange: async () => {
          let content = await editor.save();
          // Put your logic here to save this data to your DB
          const config = {
            method: "post",
            url: `http://localhost:3000/api/v1/pages/8abe36ff-a465-4660-b980-9c7261a1dfdb/save_data`,
            headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("zettelk_user_token") || null,
            },
            data:{
              "title":"sssssss",
              "page_id": "8abe36ff-a465-4660-b980-9c7261a1dfdb",
              "icon": "aaa1111111111a",
              "cover": "wwwwwwwww",
              "api": content,
            }
          } 
          axios(config)
          .then(res => res)
          .catch(err => console.error(err))

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
                byUrl: 'http://localhost:3000/api/v1/uploadImageByUrl',
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
                  console.log("safeurl: " + url)
                  
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
              endpoint: 'http://localhost:3000/api/v1/fetch',
            },
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
      <React.Fragment>
          <div id={EDITTOR_HOLDER_ID}> </div>
          <button onClick= {()=> console.log(editorData)}> data</button>
      </React.Fragment>
  );
}

export default Editor