import React, {useRef, useState, useEffect} from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import Code from '@editorjs/code'
import List from '@editorjs/list'
import Checklist from '@editorjs/checklist'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import Link from '@editorjs/link'
import Marker from '@editorjs/marker'
import NestedList from "@editorjs/nested-list";
import Quote from '@editorjs/quote'
import Underline from "@editorjs/underline";

// import Paragraph from '@edit'

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
      ]
    }
}
   
const EDITTOR_HOLDER_ID = 'editorjs';

function Editor() {
    const ejInstance = useRef();
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const initEditor = () => {
      const editor = new EditorJS({
        holder: EDITTOR_HOLDER_ID,
        logLevel: "ERROR",
        data: editorData,
        placeholder: 'Let`s write an awesome story!',
        onReady: () => {
          ejInstance.current = editor;
        },
        onChange: async () => {
          let content = await editor.saver.save();
          // Put your logic here to save this data to your DB
          setEditorData(content);
        },
        autofocus: true,
        tools: { 

          checklist:{
            class: Checklist
          },

          code:{
            class: Code,
            inlineToolbar:true,
          },

          header: {
            class: Header,
            inlineToolbar: ['link', 'bold', 'italic'],
            config: {
              placeholder: 'Enter a header',
            },
          },

          embed:{
            class: Embed
          },

          image:{
            class: Image
          },

          link:{
            class: Link
          },

          marker:{
            class: Marker
          },

          nestedlist:{
            class: NestedList,
            inlineToolbar: true,
            config: {
              placeholder: 'List'
            },
          },

          quote:{
            class: Quote
          }

        }, 
      });
    };
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
    

    
    return (
        <React.Fragment>
            <div id={EDITTOR_HOLDER_ID}> </div>
            <button onClick= {()=> console.log(editorData)}> data</button>
        </React.Fragment>
    );
}

export default Editor