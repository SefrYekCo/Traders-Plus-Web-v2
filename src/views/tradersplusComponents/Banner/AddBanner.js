import React, {useState} from 'react';
import { Input, Select, Space ,Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import ImageUploader from "../helperComponets/ImageUploader"

import ColorPicker from '../helperComponets/ColorPicker';

import styles from "./addBanner.module.css"
import { createBanner } from 'src/api/bannersApi';

import { toast } from 'react-toastify';

const AddBanner = () => {

  const [loadingBtn ,setLoadingBtn] = useState(false)

  const [titleColor ,setTiteColor] = useState("#000000")
  const [descriptionColor ,setDescriptionColor] = useState("#000000")
  const [buttonTextColor ,setButtonTextColor] = useState("#000000")
  const [buttonBackgroundColor ,setButtonBackgroundColor] = useState("#000000")
  const [backgroundColor ,setBackgroundColor] = useState("#000000")
  const [icon ,setIcon] = useState({})
  const [image ,setImage] = useState({})

  const [showDemo , setShowDemo] = useState(false)

  const [submitState ,setSubmitState] = useState(false)

  const [newBanner ,setNewBanner] = useState({
    name:"",
    description:"",
    link:"",
    action:"internalDestination",
    destination:"main",
    buttonTitle:"",
    password:"sefryek3914!@#$",
    widthScale:1,
    platform:"ANDROID"
  })

    const { Option } = Select;
    const { TextArea } = Input;

    const changeHandler = (e) => {
      setNewBanner({...newBanner ,[e.target.name]:e.target.value})
    }

    const actionChangeHandler = (e) => {
      console.log(e);
      setNewBanner({...newBanner ,["action"]:e})
    }

    const destinationChangeHandler = (e) => {
      setNewBanner({...newBanner ,["destination"]:e})
    }

    const platformChangeHandler = (e) => {
      setNewBanner({...newBanner ,["platform"]:e})
    }

    const demoHandler = (e) => {
      if(icon.name){
        const reader = new FileReader()
        reader.onload = (e) => {
          setImage(e.target.result)
         }
         
        reader.readAsDataURL(icon)
        setShowDemo(perv => !perv)
      }
    }

    const submitHandler = () => {

      setLoadingBtn(true)

      const formData = new FormData()
      formData.append("name" ,newBanner.name)
      formData.append("description" ,newBanner.description)
      formData.append("link" ,newBanner.link.length > 0 ? newBanner.link : "http://sefryek.com")
      formData.append("action" ,newBanner.action)
      formData.append("platform" ,newBanner.platform)
      formData.append("destination" ,newBanner.destination)
      formData.append("widthScale" ,newBanner.widthScale)
      formData.append("buttonTitle" ,newBanner.buttonTitle)
      formData.append("password" ,newBanner.password)
      formData.append("icon" ,icon)
      formData.append("titleColor" ,titleColor)
      formData.append("descriptionColor" ,descriptionColor)
      formData.append("buttonBackgroundColor" ,buttonBackgroundColor)
      formData.append("buttonTextColor" ,buttonTextColor)
      formData.append("backgroundColor" ,backgroundColor)

      createBanner(formData , (isOk ,data) => {
        if(isOk){
          setSubmitState(pervState => !pervState)
        
          setNewBanner({
            name:"",
            description:"",
            link:"",
            action:"",
            destination:"",
            buttonTitle:"",
            password:"sefryek3914!@#$",
            widthScale:"1"
          })
          setIcon({})
          setShowDemo(false)
          toast.success("بنر جدید با موفقیت اضافه شد")
          setLoadingBtn(false)
          return console.log(data);
        }
        toast.error("خطا در ساخت بنر")
        setLoadingBtn(false)
        return console.log(data);
      })
    }
    
    return ( 
         <Space direction="vertical" className={styles.mainContainer} >
           <div className={styles.inputContainer} >
           <label htmlFor="name" className={styles.nameLable}> {newBanner.name.length > 0 && newBanner.name.length} </label>
            <Input id='name' name='name' className={styles.inpte} size="large" placeholder="نام بنر" dir='rtl' value={newBanner.name} maxLength={80}  onChange={changeHandler}  />
           </div>
           <div  className={styles.inputContainer}>
           <label htmlFor="textarea" className={styles.nameLable}> {newBanner.description.length > 0 && newBanner.description.length} </label>
            <TextArea
                id='textarea'
                className={styles.inpte}
                value={newBanner.description} 
                dir='rtl'
                maxLength={300}
                name='description'
                onChange={changeHandler} 
                placeholder="توضیحات"
                autoSize={{ minRows: 3, maxRows: 5 }}
                />
           </div>
           <div className={styles.inputContainer} >
           <label htmlFor="buttonText" className={styles.nameLable}> {newBanner.buttonTitle.length > 0 && newBanner.buttonTitle.length} </label>
            <Input dir="rtl" id='buttonText' className={styles.inpte} name='buttonTitle' size="large" placeholder="متن دکمه (حداکثر 20 کاراکتر)" value={newBanner.buttonTitle} maxLength={20}  onChange={changeHandler}  />
           </div>

            <Space direction='horizontal' dir='rtl' style={{display:'flex' ,justifyContent:"flex-start"}}>
                <Select  onChange = {actionChangeHandler} defaultValue="نوع لینک" style={{ width: 120 }} >
                    <Option style={{textAlign:"right"}}  value="externalDestination">لینک خارجی</Option>
                    <Option style={{textAlign:"right"}}  value="internalDestination">لینک داخلی</Option>
                </Select>
                <Select disabled = {newBanner.action === "internalDestination" ? false :true} direction='rtl' defaultValue=" لینک به خانه" style={{ width: 120 }} onChange={destinationChangeHandler} >
                    <Option style={{textAlign:"right"}}  value="main">خانه</Option>
                    <Option style={{textAlign:"right"}}  value="subscriptionBaseFragment">صفحه اشتراک</Option>
                    <Option style={{textAlign:"right"}}  value="channelFragment"> صفحه کانالها</Option>
                    <Option style={{textAlign:"right"}}  value="servicesFragment">صفحه خدمات</Option>
                    <Option style={{textAlign:"right"}}  value="myPortfolioBaseFragment">صفحه سبد من</Option>
                    <Option style={{textAlign:"right"}}  value="userOptionsFragment">صفحه سایر</Option>
                    <Option style={{textAlign:"right"}}  value="weatherForecastFragment">نقشه بازار</Option>
                </Select>
                <Select  direction='rtl' defaultValue={`${newBanner.platform}`} style={{ width: 120 }} onChange={platformChangeHandler} >
                    <Option style={{textAlign:"right"}}  value="WEB"> web </Option>
                    <Option style={{textAlign:"right"}}  value="ANDROID"> android </Option>
                </Select>
            </Space>

            <Input value={newBanner.link} name='link' placeholder='لینک بنر' onChange={changeHandler}  dir='rtl' />
            <ImageUploader width={"80%"} height={"300px"} setIcon = {setIcon} />
            
              <div style={{marginTop:'2rem'}} className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={backgroundColor} setAddBannerState = {setBackgroundColor} submitState ={submitState} setSubmitState ={setSubmitState} />
                    <p> رنگ پس‌زمینه </p>
              </div>
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={buttonBackgroundColor} setAddBannerState = {setButtonBackgroundColor} submitState ={submitState} setSubmitState ={setSubmitState} />
                    <p> رنگ پس‌زمینه دکمه </p>
              </div>
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={buttonTextColor} setAddBannerState = {setButtonTextColor} submitState ={submitState} setSubmitState ={setSubmitState} />
                    <p> رنگ متن دکمه </p>
              </div>
              <div  className={styles.colorpickerContainer} direction='horizontal'>
                    <ColorPicker addBannerState={titleColor} setAddBannerState = {setTiteColor} submitState ={submitState} setSubmitState ={setSubmitState} />
                    <p> رنگ عنوان </p>
              </div>
              <div className={styles.colorpickerContainer}  direction='horizontal'>
                    <ColorPicker addBannerState={descriptionColor} setAddBannerState = {setDescriptionColor} submitState ={submitState} setSubmitState ={setSubmitState} />
                    <p> رنگ توضیحات </p>
              </div>
              {
                showDemo &&
              <div style={{display:"flex" ,flexDirection:"row-reverse" ,alignItems:"center" ,borderRadius:"10px" ,width:"50%" ,minHeight:"200px", padding:"0 10px" ,backgroundColor:`${backgroundColor}`}}>
                <img style={{width:"40%" ,height:"100%" ,borderRadius:"0.5rem"}} src={image} alt="bannerImg" />
                <div style={{display:"flex" ,padding:"5px", flexDirection:"column" ,alignItems:"center" ,justifyContent:"space-evenly" ,width:"58%"}}>
                  <h5 style={{color:`${titleColor}` ,textAlign:"right" ,alignSelf:"flex-end" ,marginRight:"5px" ,height:"30%" ,width:"100%"}}>{newBanner.name} </h5>
                  <p style={{color:`${descriptionColor}` ,width:"100%" ,textAlign:"right" ,alignSelf:"flex-end" ,marginRight:"5px",height:"20%" ,overflowX:"auto"}}>{newBanner.description} </p>
                  <Button style={{width:"60%" ,backgroundColor:`${buttonBackgroundColor}` ,color:`${buttonTextColor}` ,borderRadius:".5rem" ,textAlign:"center"}}>
                    {newBanner.buttonTitle}
                  </Button>
                </div>
              </div>
              }
              <div style={{display:"flex" , justifyContent:"flex-end" ,marginBottom:"2rem"}}>
              <Button
            type="default"
            style={{marginRight:"1rem" ,color:"#1890ff"  ,textAlign:"center"}}
            
            onClick={demoHandler}
            >
            نمایش دمو بنر
          </Button>
            <Button
            type="primary"
            loading={loadingBtn}
            onClick={submitHandler}
            >
            ثبت بنر
          </Button>
              </div>
        </Space>
      
     );
}
 
export default AddBanner;