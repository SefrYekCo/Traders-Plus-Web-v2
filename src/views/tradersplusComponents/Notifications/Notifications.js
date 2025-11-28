import { Button, Select ,Space, Table } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {Form} from "react-bootstrap"
import { toast } from 'react-toastify';
import {sendNotifByCount} from "../../../api/adminApi"
import { ReportsExport } from '../export/Export';

import styles from "./notifications.module.css";


const AddChannel = () => {

    const { Option } = Select;

    const [loadingBtn ,setLoadingBtn] = useState(false)
    
    const [notificationData ,setNotificationData] = useState({
        title:"",
        message:"",
        password:"sefryek3914!@#$",
        action:"internalDestination",
        destination:"",
        count:1,
        from:1
    })

    const [corrects , setCorrects] = useState([])
    const [wrongs , setWrongs] = useState([])

    const actionChangeHandler = (e) => {
      if(e === "externalDestination"){
        setNotificationData({...notificationData ,["destination"]:""})
      }
      setNotificationData({...notificationData ,["action"]:e})

    }

    const destinationChangeHandler = (e) => {
      setNotificationData({...notificationData ,["destination"]:e})
    }

    const changeHandler = (e) => {
        setNotificationData({...notificationData ,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
      setLoadingBtn(true)
      const data = {
        title:notificationData.title,
        message:notificationData.message,
        action:notificationData.action,
        destination:notificationData.destination,
        password:notificationData.password,
        from:parseInt(notificationData.from),
        count:parseInt(notificationData.count)
      }
      

      sendNotifByCount(data ,(isOk ,info) => {
        if(isOk){
          setLoadingBtn(false)
          console.log(info);
          
          const correctsArr = []
          info.data.response.correctOnes.map(item => {
            return(
              correctsArr.push(
                {
                  corrects:item
                }
              )
            )
          })
              
          setCorrects(correctsArr)
          setNotificationData({
              title:"",
              message:"",
              password:"sefryek3914!@#$",
              action:"internalDestination",
              destination:"",
              count:1,
              from:1
          })
          return toast.success("پیام با موفقیت ارسال شد")
        }
        toast.error("خطا در ارسال پیام")
        setLoadingBtn(false)
        return console.log(info);
      })
    }

    const dataSource = corrects.length > 0 ? [
     ...corrects
    ] :
    []

    const columns = [
      {
        title: ' ارسال های موفق',
        dataIndex: 'corrects',
        key: 'corrects',
        align:"right"
      },
    ];

    return ( 
        
            <Form onSubmit={submitHandler} className = {styles.formContainer} >
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                   
                    <Form.Control onChange={changeHandler}  value={notificationData.title} type="text" name='title' dir='rtl' placeholder="نام پیام" className='w-100' />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
                    
                    <Form.Control onChange={changeHandler} value={notificationData.message} as="textarea" name='message' dir='rtl' placeholder='متن پیام' className='w-100' rows={3} style={{resize:"none"}} />
                </Form.Group>
            
                <Space direction='horizontal' dir='rtl' style={{display:'flex' ,justifyContent:"flex-start" ,width:'100%'}}>
                <Select defaultValue="نوع لینک" onChange={actionChangeHandler} style={{ width: 120 }} >
                    <Option style={{textAlign:"right"}}  value="externalDestination">لینک خارجی</Option>
                    <Option style={{textAlign:"right"}}  value="internalDestination">لینک داخلی</Option>
                </Select>
                {
                  notificationData.action === "internalDestination" &&
                <Select  disabled={notificationData.action === "internalDestination" ? false : true}  direction='rtl' onChange={destinationChangeHandler} defaultValue="لینک به" style={{ width: 120 }}  >
                    
                    <Option style={{textAlign:"right"}} value="main">خانه</Option>
                    <Option style={{textAlign:"right"}}  value="subscriptionBaseFragment">صفحه اشتراک</Option>
                    <Option style={{textAlign:"right"}}  value="channelFragment"> صفحه کانالها</Option>
                    <Option style={{textAlign:"right"}}  value="servicesFragment">صفحه خدمات</Option>
                    <Option style={{textAlign:"right"}}  value="myPortfolioBaseFragment">صفحه سبد من</Option>
                    <Option style={{textAlign:"right"}}  value="userOptionsFragment">صفحه سایر</Option>
                    <Option style={{textAlign:"right"}}  value="weatherForecastFragment">نقشه بازار</Option>
                </Select>
                }
             
            </Space>
            { notificationData.action === "externalDestination" &&

                <Form.Group  className="mb-3 mt-3 w-100 " controlId="exampleForm.ControlTextarea1">
                    <Form.Control  onChange={changeHandler} placeholder="لینک" value={notificationData.destination} as="input" type='text' min={1}  name='destination' dir='ltr'  className={styles.link} />
                </Form.Group>
            }
                <Form.Group  className="mb-3 mt-3 w-100 d-flex  justify-content-end align-items-center" controlId="exampleForm.ControlTextarea1">
                    <Form.Control  onChange={changeHandler}  value={notificationData.from} as="input" type='number' min={1}  name='from' dir='rtl'  className='w-25 d-flex' />
                    <label className='ms-2'> :ارسال پیام از کاربر</label>
                </Form.Group>
                <Form.Group  className="mb-3 mt-3 w-100 d-flex  justify-content-end align-items-center" controlId="exampleForm.ControlTextarea1">
                    <Form.Control  onChange={changeHandler}  value={notificationData.count} as="input" type='number' min={1}  name='count' dir='rtl'  className='w-25 d-flex' />
                    <label className='ms-2'> :تعداد ارسال پیام </label>
                </Form.Group>
                <div className="col-md-2 w-100 d-flex justify-content-end mt-3 ">      
                    <Button
                        type="primary"
                        loading={loadingBtn}
                        onClick={submitHandler}
                        className="mb-2"
                    >
                    ارسال پیام

                    </Button>
                </div>
                {
                  corrects.length > 0 &&
                  <>
                <Table style={{width:"100%"}} dataSource={dataSource} columns={columns} pagination={{pageSize:5}} />
                <ReportsExport csvData={dataSource} fileName={`لیست دریافت کنندگان اعلان جدید`} />
                  </>
                }
            </Form>
        
     );
}
 
export default AddChannel;