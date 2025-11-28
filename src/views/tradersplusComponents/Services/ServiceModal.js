/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button ,Select ,Space ,Input } from 'antd';


import { useLocation } from 'react-router-dom';
import styles from "./serviceModal.module.css";

import ImageUploader from '../helperComponets/ImageUploader';

import { editBanner } from 'src/api/bannersApi';
import { toast } from 'react-toastify';
import { editService } from 'src/api/serviceApi';

const { TextArea } = Input;

const ServiceModal = ({setUpdate ,service}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newServiceData ,setNewServiceData] = useState({
      name:service.name ? service.name : "",
      description:service.description ? service.description : "",
      link:service.link ? service.link : "",
      info:service.info ? service.info : "",
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
      formdata.append("id" ,id2)
      if(newServiceData.name.length > 0){
          formdata.append("name" , newServiceData.name)
      }
      if(newServiceData.description.length > 0){
          formdata.append("description" , newServiceData.description)
      }
      if(newServiceData.link.length > 0){
          formdata.append("link" , newServiceData.link)
      }
      if(newServiceData.info.length > 0){
          formdata.append("info" , newServiceData.info)
      }
      if(icon.name){
          formdata.append("icon" , icon)
      }
      formdata.append("isActive" , true)
      formdata.append("password" , 'sefryek3914!@#$')

      editService(formdata ,(isOk ,data) => {
          if(isOk){
              toast.success("ادیت سرویس با موفقیت انجام شد")
              setIsModalVisible(false);

              setUpdate((perv) => !perv)
              return 
          }
          console.log(data);
          return toast.error("خطا در ادیت سرویس ")
      })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewServiceData({
      name:service.name,
      description:service.description,
      link:service.link,
      info:service.info,
      })
      setIcon({})
      setSubmitState(perv => !perv)
  };

  const changeHandler = (e) => {
    setNewServiceData({...newServiceData ,[e.target.name]:e.target.value})
  }

  return (
    <>
        <Button type="primary" onClick={showModal} className={styles.btn}  >
            ویرایش
        </Button>
      <Modal className={styles.modal} width={"50%"} zIndex={"1200"} centered title={<h3> ویرایش سرویس</h3>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ویرایش" cancelText="منصرف شدم"  >
        <Input name='name' size="large" placeholder="نام جدید(حداکثر 120 کاراکتر)" dir='rtl' value={newServiceData.name ? newServiceData.name : service.name} maxLength={120}  onChange={changeHandler}  />
        <TextArea
                value={newServiceData.description ? newServiceData.description : service.description} 
                dir='rtl'
                maxLength={300}
                name='description'
                onChange={changeHandler} 
                placeholder="توضیحات"
                autoSize={{ minRows: 3, maxRows: 5 }}
                />
        <Input name='info' size="large" placeholder="info" dir='rtl' value={newServiceData.info ? newServiceData.info : service.info} maxLength={120}  onChange={changeHandler}  />

        <Input name='link' size="large" placeholder="لینک جدید" dir='rtl' value={newServiceData.link ? newServiceData.link : service.link}   onChange={changeHandler}  />
        <ImageUploader width={"30%"} setIcon={setIcon} height={"120px"} />
      </Modal>
    </>
  );
};

export default ServiceModal;