/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button ,Select ,Space ,Input } from 'antd';


import { useLocation } from 'react-router-dom';
import styles from "./brokerageModal.module.css";

import ImageUploader from '../helperComponets/ImageUploader';

import { editBanner } from 'src/api/bannersApi';
import { toast } from 'react-toastify';
import { editService } from 'src/api/serviceApi';
import { editBrokerage } from 'src/api/brokerageApi';

const { TextArea } = Input;

const BrokerageModal = ({setUpdate , broker}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newBrokerData ,setNewBrokerData] = useState({
      name:broker.name ? broker.name : "",
      webAddress:broker.webAddress ? broker.webAddress : "",
      mobileAddress:broker.mobileAddress ? broker.mobileAddress : "",
      index:broker.index ? broker.index : 0
  })

  const [submitState ,setSubmitState] = useState(false)


  const [icon ,setIcon] = useState({})

  const showModal = () => {
    setIsModalVisible(true);
  };

  const location = useLocation()
  const id2 = location.pathname.split("/")[2]

  const handleOk = () => {
      const formdata = new FormData()
      if(newBrokerData.name.length > 0){
          formdata.append("name" , newBrokerData.name)
      }
      if(newBrokerData.webAddress.length > 0){
          formdata.append("webAddress" , newBrokerData.webAddress)
      }
      if(newBrokerData.mobileAddress.length > 0){
          formdata.append("mobileAddress" , newBrokerData.mobileAddress)
      }
      if(icon.name){
          formdata.append("icon" , icon)
      }
      if(newBrokerData.index){
        formdata.append("index" , +newBrokerData.index)
      }
      formdata.append("isActive" , broker.isActive)
      formdata.append("password" , 'sefryek3914!@#$')

      editBrokerage( id2, formdata ,(isOk ,data) => {
          if(isOk){
              toast.success("ویرایش کارگزاری با موفقیت انجام شد")
              setIsModalVisible(false);

              setUpdate((perv) => !perv)
              return 
          }
          console.log(data);
          return toast.error("خطا در ویرایش کارگزاری ")
      })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewBrokerData({
      name:broker.name,
      webAddress:broker.webAddress,
      mobileAddress:broker.mobileAddress,
      index:broker.index
      })
      setIcon({})
      setSubmitState(perv => !perv)
  };

  const changeHandler = (e) => {
    setNewBrokerData({...newBrokerData ,[e.target.name]:e.target.value})
  }

  return (
    <>
        <Button type="primary" onClick={showModal} className={styles.btn}  >
            ویرایش
        </Button>
      <Modal className={styles.modal} width={"50%"} zIndex={"1200"} centered title={<h3> ویرایش کارگزاری</h3>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ویرایش" cancelText="منصرف شدم"  >
        <Input name='name' size="large" placeholder="نام جدید(حداکثر 120 کاراکتر)" dir='rtl' value={newBrokerData.name ? newBrokerData.name : broker.name} onChange={changeHandler}  />

        <Input name='webAddress' size="large" placeholder="web address" dir='rtl' value={newBrokerData.webAddress ? newBrokerData.webAddress : broker.webAddress}  onChange={changeHandler}  />
        <Input name='mobileAddress' size="large" placeholder="mobile address" dir='rtl' value={newBrokerData.mobileAddress ? newBrokerData.mobileAddress : broker.mobileAddress}  onChange={changeHandler}  />

        <label className={styles.label} > اولویت نمایش </label>
        <Input name='index' type={"number"} size="large" placeholder="اولویت نمایش" dir='rtl' value={newBrokerData.index}  onChange={changeHandler}  />
        <ImageUploader width={"30%"} setIcon={setIcon} height={"120px"} />
      </Modal>
    </>
  );
};

export default BrokerageModal;