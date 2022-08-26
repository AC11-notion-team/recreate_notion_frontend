import React, {useRef, useState, useEffect} from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import Code from '@editorjs/code';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image'
import LinkTool from '@editorjs/link';
import Marker from '@editorjs/marker';
import NestedList from '@editorjs/nested-list';
import Quote from '@editorjs/quote';
import Underline from '@editorjs/underline';
import DragDrop from 'editorjs-drag-drop';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
// const SimpleImage = require('@editorjs/simple-image')

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
            "url": "https://img.kocpc.com.tw/2018/12/1545287991-2b91dabdba15918b6cf95949a67f41c8.jpg",
            "caption" : "Roadster // tesla.com",
            "withBorder" : false,
            "withBackground" : false,
            "stretched" : true
          }
        },
        {
          "type": "link",
          "data": {
            "link": "https://www.google.com/search?q=react&sxsrf=ALiCzsauetnFkf9gsiDrSEo5gIaLcllhbg:1661410008491&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi-mYfLsuH5AhWGat4KHWInDg0Q_AUoAnoECAIQBA&biw=1920&bih=1001&dpr=2#imgrc=viJ6CsTiT3pOsM",
            // "caption" : "Roadster // tesla.com",
            // "withBorder" : false,
            // "withBackground" : false,
            // "stretched" : true
            meta:{
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
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
     // This will run only once
    useEffect(() => {
      if (!ejInstance.current) {
          initEditor();
      }
      return () => {
          ejInstance.current.destroy();
          ejInstance.current = null;
      }
    }, []);

    const initEditor = () => {
      const editor = new EditorJS({
        holder: EDITTOR_HOLDER_ID,
        logLevel: "ERROR",
        data: editorData,
        inlineToolbar: true,
        placeholder:'Let`s write an awesome story!',
        onReady: () => {
          ejInstance.current = editor;
          new DragDrop(editor);
        },
        onChange: async () => {
          let content = await editor.save();
          // Put your logic here to save this data to your DB
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

          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: 'Enter a header',
            },
          },

          embed: Embed,

          image: SimpleImage,

          // link:{
          //   class: LinkTool,
          //   config: {
          //     endpoint: 'http://localhost:3000/fetchUrl', // Your backend endpoint for url data fetching
          //   },
          // },

          marker:{
            class: Marker,
          },

          list:{
            class: NestedList,
            inlineToolbar: true,
            // config: {
            //   placeholder: 'List',
            // },
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

          link: LinkTool
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