import React, { useContext, useEffect, useState } from 'react';
import { editBanner, getBanner } from 'src/api/bannersApi';
import noPhoto from "../../../images/no-image-icon-23485 (1).png";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'

import { EyeOutlined } from '@ant-design/icons';
import style from "./service.module.css"
import { Button } from 'antd';
import { editService, getServices, getServicesReport } from 'src/api/serviceApi';
import { toast } from 'react-toastify';
import ServiceModal from './ServiceModal';

const Sevice = () => {

  const [service ,setService] = useState({})
  const [active ,setActive] = useState(false)
  const [click ,setClick] = useState()
  const [update ,setUpdate] = useState(false)
  
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const handleActivation = (isActive) => {
  
    const formdata = new FormData()
      formdata.append("id" ,id)
      formdata.append("password" ,"sefryek3914!@#$")
      if(isActive){
        formdata.append("isActive" , false)
      }else{
        formdata.append("isActive" ,true)
      }

      editService(formdata ,(isOk ,data) => {
        if(isOk){
          setUpdate(perv => !perv)
           return console.log(data);
        }
        console.log(data);
        return 
    })
  }


    useEffect(() => {
     
      getServices((isOk ,data) => {
        if(isOk){
          console.log(data.response);
          const service = data.response.services.find((item) => item._id === id)
          console.log(service);
          if(!service){
              return toast.error("سرویس مورد نظر یافت نشد")
          }
          getServicesReport((isOk ,data) => {
            if(isOk){
             
              const report = data.response.reports.find((item) => item.serviceId === id)
              console.log(report);

              if(!report){
                  return toast.error("گزارش سرویس مورد نظر یافت نشد")
              }
              return setClick(report.total)
            }else{
              return console.log(data);
            }
          })
          return setService(service)
        }else{
          return console.log(data);
        }
      })
    } ,[update])

    
    
    return ( 
      <>
      <div className = {style.container} >
      <img src={ service.icon ? service.icon : noPhoto } alt="service icon" style={{width:300 ,height:300 ,alignSelf:"center" ,borderRadius:"1rem"}} />
      <div className = { style.detailsContainer}>
        
          <h3 dir='rtl'>{service.name}</h3>
      
          <p dir='rtl'>{service.description}</p>
          <a href={service.link} target="_blank" rel='noopener noreferrer' ><span> لینک:</span>{service.link}</a>
          <p dir='rtl'><span style={{fontWeight:"bold"}}> اطلاعات:</span> {service.info} </p>
          <div className={style.buttonContainer}>
          <Button  type='default' onClick = { () => handleActivation(service.isActive)} >{service.isActive ? "غیر فعال کردن" : "فعال کردن"} </Button>
    
          <ServiceModal setUpdate={setUpdate}  service={service} />
              
          </div>
          <div className={style.clickContainer} >
            <EyeOutlined />
            <p>{click} </p>
          </div>
      </div>     
  </div>

      </>
     );
}
 
export default Sevice;