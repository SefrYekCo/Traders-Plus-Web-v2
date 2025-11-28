/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

import styles from "./emojiPicker.module.css";

const EmojiPicker = ({showHandler ,choosenEmoji ,setChosenEmoji}) => {


  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
  };

  return (
    <div className={styles.emojiContainer} style={showHandler ? {display:"block" ,position:"absolute" ,bottom:"100%" ,transition:"all 1s ease"} : {display:"none" ,height:"0px"  }} >
  
      <Picker onEmojiClick={onEmojiClick}
      
      groupVisibility={{
        flags: false,

      }}
     preload disableSkinTonePicker  disableAutoFocus={true}   />
    </div>
  );
};

export default EmojiPicker