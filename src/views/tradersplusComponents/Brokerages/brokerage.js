import React, { useContext, useEffect, useState } from 'react';

import noPhoto from "../../../images/no-image-icon-23485 (1).png";
import { useLocation } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import style from "./brokerage.module.css"
import { Button } from 'antd';
import { toast } from 'react-toastify';

import { editBrokerage, getBrokerage } from 'src/api/brokerageApi';
import BrokerageModal from "./brokerageModal"

const Brokerage = () => {

  const [brokerage ,setBrokerage] = useState({})
  const [isModalVisible ,setIsModalVisible] = useState(false)
  const [update ,setUpdate] = useState(false)
  
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const editHandler = (isActive) => {
      const formdata = new FormData()
      formdata.append("isActive" , !isActive)

    editBrokerage( id, formdata ,(isOk ,data) => {

        if(isOk){
            toast.success("ویرایش کارگزاری با موفقیت انجام شد")
            setIsModalVisible(false);

            setUpdate((perv) => !perv)
            return 
        }
        console.log(data);
        return toast.error("خطا در ویرایش کارگزاری ")
    })

  }


    useEffect(() => {
     
      getBrokerage(id ,(isOk ,data) => {
        if(isOk){
            console.log(data.response);
            return setBrokerage(data.response.obj)

        }
            toast.error(data.response.description)
            return console.log(data);
      })
    } ,[update])

    
    
    return ( 
      <>
      <div className = {style.container} >
      <img src={ brokerage.imageURL ? brokerage.imageURL : noPhoto } alt="broker icon" style={{width:300 ,height:300 ,alignSelf:"center" ,borderRadius:"1rem"}} />
      <div className = { style.detailsContainer}>
        
          <h3 dir='rtl'>{brokerage.name}</h3>
      
          <a href={brokerage.webAddress} target="_blank" rel='noopener noreferrer' ><span> وب: </span>{brokerage.webAddress}</a>
          <a href={brokerage.mobileAddress} target="_blank" rel='noopener noreferrer' ><span>  موبایل: </span>{brokerage.mobileAddress}</a>
          <p>اولویت نمایش : {brokerage.index}</p>
          <div className={style.buttonContainer}>
          <Button  type='default' onClick = { () => editHandler(brokerage.isActive)} >{brokerage.isActive ? "غیر فعال کردن" : "فعال کردن"} </Button>
    
          <BrokerageModal setUpdate={setUpdate} broker={brokerage} />
              
          </div>
          <div className={style.clickContainer} >
            <EyeOutlined />
            <p>{brokerage.click} </p>
          </div>
      </div>     
  </div>

      </>
     );
}
 
export default Brokerage;