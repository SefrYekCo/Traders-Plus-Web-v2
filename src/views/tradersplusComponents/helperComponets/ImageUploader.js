/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import styles from "./imageUploader.module.css";

import {toast} from "react-toastify";

const ImageUploader = ({setIcon ,height ,width}) => {
    const { Dragger } = Upload;

    const [image ,setImage] = useState(null)

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    maxCount:1,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info);
        const reader = new FileReader()
        reader.onload = (e) => {
          setImage(e.target.result)
         }
         
        reader.readAsDataURL(info.file)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      setIcon(e.dataTransfer.files[0])
      console.log('Dropped files', e.dataTransfer.files[0]);
    },
    beforeUpload (e){
      console.log(e);
      if(e.type === "image/png" || e.type === "image/jpeg" || e.type === "image/jpg"){
        setIcon(e)
        return false; 
      }
      setImage(null)
      toast.warn("فرمت عکس باید jpeg یا png باشد")
      return true
    },
    onRemove(e){
      setImage(null)
    }
  };

  return (
    <Dragger  {...props} style={{minHeight:height}}  >
   { image ? 
    <img src={image} alt="bannerImage" style={{width:width ,maxHeight:height ,borderRadius:"5px" }} />
   :
   <>
   <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">برای آپلود عکس کلیک کنید</p>
    <p className="ant-upload-hint">
      همپچنین میتوانید عکس مورد نظر را برداشته و درون محدوده مشخص شده رها کنید
    </p>
   </>
    }
  </Dragger>
  );
};

export default React.memo(ImageUploader)