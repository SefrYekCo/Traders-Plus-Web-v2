import React, { useContext } from 'react';

// import { Accordion, Card } from "react-bootstrap";
import { Accordion ,Card } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { activateChannel, getChannels, getChannelsForAdmin, muteChannel } from 'src/api/channelAPI';
import styles from './channel.module.css'

import { channelContext } from 'src/context/channelContext';
import { muteChannelNotification } from 'src/api/adminApi';
import { Button, Switch } from 'antd';
import { Link } from 'react-router-dom';

import {toast} from "react-toastify"
import ChannelModal from './ChannelModal';

import { getPlansForAdmin } from 'src/api/plansApi';
import { getCategories } from 'src/api/categoryApi';

const Channel = () => {

  // const channels = useContext(channelContext)
  // console.log(channels)

  const [muteController ,setMuteController] = useState(true)
  const [channels ,setChannels] = useState([])
  const [update ,setUpdate] = useState(false)
  const [isEmpty ,setIsEmpty] = useState(false)
  
  const [categories ,setCategories] = useState([])
  const [plans ,setPlans] = useState([])


  useEffect(()=>{
    getChannelsForAdmin((isOk ,data) => {
      if(isOk){
          console.log(data);
          if(data.response.length === 0){
            setIsEmpty(true)
          }
          return setChannels(data.response)
      }
      console.log(data);
  });
  } ,[update])

  useEffect(() => {

      getPlansForAdmin((isOk ,data) => {
          if(isOk){
              console.log(data.response.plans);
              return setPlans(data.response.plans)
          }
          return console.log(data);
      })

      getCategories((isOk ,data) => {
          if(isOk){
              console.log(data.response.categories);
              return setCategories(data.response.categories)
          }
          return console.log(data);
      })
  } , [])


  const channelActivation = (id ,isActive) => {
   
    const data = {
      id,
      isActive:!isActive,
      password:"sefryek3914!@#$"
    }

    activateChannel(data ,(isOk ,info) => {
      if(isOk){
        setUpdate(perv => !perv)
        return toast.success(info.description)
      }
      return toast.error("خطا در انجام عملیات")
    })
  }


    return ( 

      <>
        {
          channels.length === 0 && isEmpty ?
          <h1>داده ای یافت نشد</h1>
          :
          channels.sort((a ,b) =>  Number(b.isActive) - Number(a.isActive)).map((item) => {
            return(
              <Accordion  key={item._id} className='w-100' defaultActiveKey="0" >
              <Accordion.Item eventKey={item._id}  >
                <Accordion.Header style={item.isActive ? {backgroundColor:"#ffffff"} : {backgroundColor:"#ccc"}} className={styles.header} dir='rtl'> 
                <p> {item.name} {item.isActive ? "(فعال)" :"(غیر فعال)"} </p>
                
                 </Accordion.Header>
                <Accordion.Body className={styles.body} dir='rtl'>
                  <div>
                    <p> <span style={{color:"blue"}}>بیو</span>  : {item.bio} </p>
                    <p> <span style={{color:"blue"}}>دسته بندی </span> : {item.category ? item.category.name:""} </p>
                    <p> <span style={{color:"blue"}}>پلن</span>  : {item.plan ? item.plan.name: ""} </p>
                     <Link to={`/messages/${item._id}`}> <Button type='primary'> مشاهده پیام ها </Button></Link>
                     <ChannelModal setUpdate={setUpdate} id={item._id} plans={plans} categories = {categories} itemData = {item} />
                     <Switch onChange={() => channelActivation(item._id ,item.isActive)} checked={item.isActive} style={{margin:"0 1rem"}} /> 
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            )
          })
        }
      </>

     );
}
 
export default Channel;