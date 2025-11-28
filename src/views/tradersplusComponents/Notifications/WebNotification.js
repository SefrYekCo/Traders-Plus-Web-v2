import { Button, Select  } from 'antd';
import React from 'react';
import { useState } from 'react';

import {Form} from "react-bootstrap"
import { toast } from 'react-toastify';

import { sendWebNotification } from 'src/api/NotificationApi';

import styles from "./webNotification.module.css";


const WebNotification = () => {

    const { Option } = Select;

    const [loadingBtn ,setLoadingBtn] = useState(false)
    
    const [notificationData ,setNotificationData] = useState({
        title:"",
        body:""
    })

    const [notificationResult ,setNotificationResult] = useState({
        success:0,
        failure:0
    })

    const [showResult , setShowResult] = useState(false)


    const changeHandler = (e) => {
        setNotificationData({...notificationData ,[e.target.name]:e.target.value})
    }

    const submitHandler = async (e) => {
        const data = {
            title:notificationData.title,
            body:notificationData.body
        }

        sendWebNotification(data ,(isOk ,info) => {
            if(isOk) {
                setNotificationResult({success:info.response.success ,failure:info.response.failure})
                return setShowResult(true)
            }
                return toast.error("خطا در ارسال اعلان")
        })
    }


    return ( 
        
            <Form onSubmit={submitHandler} className = {styles.formContainer} >
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                   
                    <Form.Control onChange={changeHandler}  value={notificationData.title} type="text" name='title' dir='rtl' placeholder="نام پیام" className='w-100' />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
                    
                    <Form.Control onChange={changeHandler} value={notificationData.body} as="textarea" name='body' dir='rtl' placeholder='متن پیام' className='w-100' rows={3} style={{resize:"none"}} />
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
                  showResult &&
                    <div className={styles.showResultContainer}>
                        <p> ارسال موفق : { notificationResult.success } </p>
                        <p> ارسال ناموفق : { notificationResult.failure } </p>
                    </div>
                }
            </Form>
        
     );
}
 
export default WebNotification;