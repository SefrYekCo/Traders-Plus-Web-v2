/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button ,Select ,Space ,Input } from 'antd';


import { useLocation } from 'react-router-dom';
import styles from "./addService.module.css";

import ImageUploader from '../helperComponets/ImageUploader';
import ColorPicker from '../helperComponets/ColorPicker';

import { editBanner } from 'src/api/bannersApi';
import { toast } from 'react-toastify';
import { addService, editService } from 'src/api/serviceApi';

const { TextArea } = Input;

const AddService = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);

  const [serviceData ,setServiceData] = useState({
      name:"",
      description:"",
      link:"",
      info:"",
  })

  const [loading ,setLoading] = useState(false)
  const [icon ,setIcon] = useState({})

  const submitHandler = () => {
    setLoading(true)
      const formdata = new FormData()
      formdata.append("name" , serviceData.name)
      formdata.append("description" , serviceData.description)
      formdata.append("link" , serviceData.link)
      formdata.append("info" , serviceData.info)
      formdata.append("icon" , icon)
      formdata.append("password" , 'sefryek3914!@#$')

      addService(formdata ,(isOk ,data) => {
          if(isOk){
              toast.success("ساخت سرویس با موفقیت انجام شد")
              setIsModalVisible(false);
              setServiceData({
                name:"",
                description:"",
                link:"",
                info:"",
              })
              
              return setLoading(false)
          }
          console.log(data);
          setLoading(false)
          return toast.error("خطا در ساخت سرویس ")
      })
  };

  const changeHandler = (e) => {
    setServiceData({...serviceData ,[e.target.name]:e.target.value})
  }

  return (
    <div className={styles.container}>
      
        <Input name='name' size="large" placeholder="نام جدید(حداکثر 80 کاراکتر)" dir='rtl' value={serviceData.name} maxLength={80}  onChange={changeHandler}  />
        <TextArea
                value={serviceData.description} 
                dir='rtl'
                maxLength={300}
                name='description'
                onChange={changeHandler} 
                placeholder="توضیحات(حداکثر 300 کاراکتر)"
                autoSize={{ minRows: 3, maxRows: 5 }}
                />
        <Input name='info' size="large" placeholder="info" dir='rtl' value={serviceData.info} maxLength={120}  onChange={changeHandler}  />

        <Input name='link' size="large" placeholder="لینک جدید" dir='rtl' value={serviceData.link}   onChange={changeHandler}  />
        <ImageUploader width={"30%"} setIcon={setIcon} height={"300px"} />

        <Button loading={loading} onClick={submitHandler} className={styles.btn} type='primary'>
            ساخت سرویس
        </Button>
      
    </div>
  );
};

export default AddService;