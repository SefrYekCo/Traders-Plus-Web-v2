/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button ,Input } from 'antd';

import styles from "./addBrokerage.module.css";

import ImageUploader from '../helperComponets/ImageUploader';

import { toast } from 'react-toastify';
import { createBrokerage } from 'src/api/brokerageApi';

const { TextArea } = Input;

const AddBroker = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);

  const [brokerData ,setBrokerData] = useState({
      name:"",
      webAddress:"",
      mobileAddress:"",
      index:"0",
      isActive:true
  })

  const [loading ,setLoading] = useState(false)
  const [icon ,setIcon] = useState({})

  const submitHandler = () => {
    setLoading(true)
      const formdata = new FormData()
      formdata.append("name" , brokerData.name)
      formdata.append("webAddress" , brokerData.webAddress)
      formdata.append("mobileAddress" , brokerData.mobileAddress)
      formdata.append("index" , brokerData.index)
      formdata.append("icon" , icon)
      formdata.append("isActive" , brokerData.isActive)
      formdata.append("password" , 'sefryek3914!@#$')

      createBrokerage(formdata ,(isOk ,data) => {
          if(isOk){
              toast.success("ساخت کارگزاری با موفقیت انجام شد")
              setIsModalVisible(false);
              setBrokerData({
                name:"",
                webAddress:"",
                mobileAddress:"",
                index:"",
                isActive:true
              })
              
              return setLoading(false)
          }
          console.log(data);
          setLoading(false)
          return toast.error("خطا در ساخت کارگزاری ")
      })
  };

  const changeHandler = (e) => {
    setBrokerData({...brokerData ,[e.target.name]:e.target.value})
  }

  return (
    <div className={styles.container}>
      
        <Input name='name' size="large" placeholder="نام جدید" dir='rtl' value={brokerData.name}  onChange={changeHandler}  />
        <TextArea
                value={brokerData.webAddress} 
                dir='rtl'
                maxLength={300}
                name='webAddress'
                onChange={changeHandler} 
                placeholder="آدرس وب"
                autoSize={{ minRows: 3, maxRows: 5 }}
        />
             <TextArea
                value={brokerData.mobileAddress} 
                dir='rtl'
                maxLength={300}
                name='mobileAddress'
                onChange={changeHandler} 
                placeholder="آدرس موبایل"
                autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Input name='index' size="large" placeholder="اولویت نمایش" dir='rtl' value={brokerData.index} onChange={changeHandler}  />

        <ImageUploader width={"30%"} setIcon={setIcon} height={"300px"} />

        <Button loading={loading} onClick={submitHandler} className={styles.btn} type='primary'>
            ساخت کارگزاری
        </Button>
      
    </div>
  );
};

export default AddBroker;