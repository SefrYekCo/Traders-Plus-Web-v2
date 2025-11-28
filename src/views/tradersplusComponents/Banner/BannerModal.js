/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Modal, Button ,Select ,Space ,Input} from 'antd';


import { useLocation } from 'react-router-dom';
import styles from "./bannerModal.module.css";

import ImageUploader from '../helperComponets/ImageUploader';
import ColorPicker from '../helperComponets/ColorPicker';

import { editBanner } from 'src/api/bannersApi';
import { toast } from 'react-toastify';

const BannerModal = ({update ,setUpdate ,appearance ,bannerData}) => {
  // console.log(bannerData);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newBannerData ,setNewBannerData] = useState({
      name:bannerData.name ? bannerData.name : "",
      description:bannerData.description ? bannerData.description : "",
      link:bannerData.link ? bannerData.link : "",
      buttonTitle:bannerData.buttonTitle ? bannerData.buttonTitle : "",
      action:bannerData.action ? bannerData.action : "",
      destination:bannerData.destination ? bannerData.destination : "",
      platform: bannerData.platform ? bannerData.platform : "ANDROID"
  })

  const [submitState ,setSubmitState] = useState(false)

  const [titleColor ,setTiteColor] = useState("")
  const [descriptionColor ,setDescriptionColor] = useState("")
  const [buttonTextColor ,setButtonTextColor] = useState("")
  const [buttonBackgroundColor ,setButtonBackgroundColor] = useState("")
  const [backgroundColor ,setBackgroundColor] = useState("")

  const [icon ,setIcon] = useState({})

  const showModal = () => {
    setIsModalVisible(true);
  };

  const actionChangeHandler = (e) => {
    setNewBannerData({...newBannerData ,["action"]:e.target.value})
  }

  const platformChangeHandler = (e) => {
    setNewBannerData({...newBannerData ,["platform"]:e.target.value})
  }

  const destinationChangeHandler = (e) => {
    setNewBannerData({...newBannerData ,["destination"]:e.target.value})
  }
  const location = useLocation()
  const id2 = location.pathname.split("/")[2]

  useEffect(() => {} ,[update])

  const handleOk = () => {
      const formdata = new FormData()
      formdata.append("id" ,id2)

      formdata.append("name" ,newBannerData.name)
      formdata.append("description" ,newBannerData.description)
      formdata.append("link" ,newBannerData.link)
      formdata.append("buttonTitle" ,newBannerData.buttonTitle)
      formdata.append("action" ,newBannerData.action)
      formdata.append("destination" ,newBannerData.destination)
      formdata.append("platform" ,newBannerData.platform)

      formdata.append("titleColor" ,titleColor)
      formdata.append("descriptionColor" ,descriptionColor)
      formdata.append("buttonBackgroundColor" ,buttonBackgroundColor)
      formdata.append("buttonTextColor" ,buttonTextColor)
      formdata.append("backgroundColor" ,backgroundColor)
      
      if(icon.name){
      formdata.append("icon" , icon)
      }
      formdata.append("isActive" , true)

      editBanner(formdata ,(isOk ,data) => {
          if(isOk){
              toast.success("ادیت بنر با موفقیت انجام شد")
            
              setSubmitState(perv => !perv)
              setUpdate((perv) => !perv)
              return setIsModalVisible(false);
          }
          console.log(data);
          return toast.error("خطا در ادیت بنر ")
      })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewBannerData({
        name:bannerData.name,
        description:bannerData.description,
        link:bannerData.link,
        buttonTitle:bannerData.buttonTitle,
        action:bannerData.action,
        destination:bannerData.destination
      })
      setBackgroundColor(appearance.backgroundColor)
      setButtonBackgroundColor(appearance.buttonBackgroundColor)
      setButtonTextColor(appearance.buttonTextColor)
      setTiteColor(appearance.titleColor)
      setDescriptionColor(appearance.descriptionColor)
      setSubmitState(perv => !perv)
  };

  const changeHandler = (e) => {
    setNewBannerData({...newBannerData ,[e.target.name]:e.target.value})
  }

  return (
    <>
        <Button type="primary" onClick={showModal} className={styles.btn} >
            ویرایش
        </Button>
      <Modal className={styles.modal} width={"50%"} zIndex={"1200"} centered title={<h3> ویرایش بنر</h3>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="ویرایش" cancelText="منصرف شدم"  >
        <Input name='name' size="large" placeholder="نام جدید(حداکثر 120 کاراکتر)" dir='rtl' value={newBannerData.name ? newBannerData.name :bannerData.name} maxLength={120}  onChange={changeHandler}  />
        <Input name='description' size="large" placeholder="توضیحات جدید(حداکثر 120 کاراکتر)" dir='rtl' value={newBannerData.description ? newBannerData.description :bannerData.description} maxLength={120}  onChange={changeHandler}  />
        <Space className={styles.space} direction='horizontal' dir='rtl' style={{display:'flex' ,justifyContent:"flex-start"}}>
                <select onChange = {actionChangeHandler}  value={newBannerData.action ? newBannerData.action :bannerData.action} defaultValue="نوع لینک" style={{ width: 120 }} >
                    <option value="externalDestination">لینک خارجی</option>
                    <option value="internalDestination">لینک داخلی</option>
                </select>
                <select direction='rtl' value={newBannerData.destination ? newBannerData.destination :bannerData.destination} disabled = {newBannerData.action === "internalDestination" ? false :true} style={{ width: 120 }} onChange={destinationChangeHandler} >
                    <option value="externalDestination">خانه</option>
                    <option value="subscriptionBaseFragment">صفحه اشتراک</option>
                    <option value="channelFragment"> صفحه کانالها</option>
                    <option value="servicesFragment">صفحه خدمات</option>
                    <option value="myPortfolioBaseFragment">صفحه سبد من</option>
                    <option value="userOptionsFragment">صفحه سایر</option>
                    <option value="weatherForecastFragment">نقشه بازار</option>
                </select>
                <select onChange = {platformChangeHandler}  value={newBannerData.platform ? newBannerData.platform :bannerData.platform} defaultValue={`${newBannerData.platform}`} style={{ width: 120 }} >
                    <option value="ANDROID"> android </option>
                    <option value="WEB"> web </option>
                </select>
        </Space>
        <Input  className={styles.link}  name='link' size="large" placeholder="لینک جدید" dir='rtl' value={newBannerData.link ? newBannerData.link :bannerData.link}   onChange={changeHandler}  />
        <Input name='buttonTitle' size="large" placeholder="متن دکمه جدید(حداکثر 20 کاراکتر)" dir='rtl' value={newBannerData.buttonTitle ? newBannerData.buttonTitle :bannerData.buttonTitle} maxLength={20}  onChange={changeHandler}  />

        <div className={styles.colorPickerMainContainer}>
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={backgroundColor} setAddBannerState = {setBackgroundColor} submitState ={submitState} setSubmitState ={setSubmitState} hexColor={appearance.backgroundColor} />
                    <span> {appearance.backgroundColor}</span>
                    <p> رنگ پس‌زمینه </p>
              </div>
                
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={buttonBackgroundColor} setAddBannerState = {setButtonBackgroundColor} submitState ={submitState} setSubmitState ={setSubmitState} hexColor={appearance.buttonBackgroundColor} />
                    <span> {appearance.buttonBackgroundColor}</span>
                    <p> رنگ پس‌زمینه دکمه </p>
              </div>
            
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={buttonTextColor} setAddBannerState = {setButtonTextColor} submitState ={submitState} setSubmitState ={setSubmitState} hexColor={appearance.buttonTextColor} />
                    <span> {appearance.buttonTextColor}</span>
                    <p> رنگ متن دکمه </p>
              </div>
            
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={titleColor} setAddBannerState = {setTiteColor} submitState ={submitState} setSubmitState ={setSubmitState} hexColor={appearance.titleColor} />
                    <span> {appearance.titleColor}</span>
                    <p> رنگ عنوان </p>
              </div>
            
              <div className={styles.colorpickerContainer}  direction='horizontal'>
                    <ColorPicker addBannerState={descriptionColor} setAddBannerState = {setDescriptionColor} submitState ={submitState} setSubmitState ={setSubmitState} hexColor={appearance.descriptionColor} />
                    <span> {appearance.descriptionColor}</span>
                    <p> رنگ توضیحات </p>
              </div>
              </div>
        <ImageUploader width={"30%"} setIcon={setIcon} height={"120px"} />

      </Modal>
    </>
  );
};

export default BannerModal;