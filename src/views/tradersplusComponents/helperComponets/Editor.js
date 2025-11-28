// /* eslint-disable react/prop-types */
// import React from 'react';

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import styles from "./editor.module.css"

// export default function TextEditor({state ,setState}) {

//   const toolbar = {
//     options: [ 'emoji', 'history'],
//   }



//   const onContentStateChange = (e) => {
//     // console.log(e);
   
//     const message = e.blocks.map((item) =>{ return(item.text) })
//     // console.log(message);
//     const text = message.join(" ")
//     // console.log(text);

//     setState(text)
//   };

//   return (
   
//         <Editor
//             toolbarClassName={styles.toolbar}
//             wrapperClassName={styles.wrapper}
//             editorClassName={styles.editor}
//             initialContentState={state}
//             onContentStateChange = {onContentStateChange}
//             toolbar={toolbar}
//             textAlignment="right"
//         />

//   );
// }