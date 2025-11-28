import React, { useContext, useEffect, useState } from 'react';
import { editBanner, getBanner } from 'src/api/bannersApi';
import noPhoto from "../../../images/no-image-icon-23485 (1).png";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import BannerModal from './BannerModal';

import style from "./banner.module.css"
import { Button, Table } from 'antd';
import { ReportsExport } from '../export/Export';

const Banner = () => {

  const [banner ,setBanner] = useState({})
  const [active ,setActive] = useState(false)

  const [update ,setUpdate] = useState(false)
  
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const handleActivation = (e) => {
    
    const formdata = new FormData()
      formdata.append("id" ,id)
      if(e.target.innerText === "غیر فعال کردن"){
        formdata.append("isActive" , false)
      }else{
        formdata.append("isActive" ,true)
      }

      editBanner(formdata ,(isOk ,data) => {
        if(isOk){
          setUpdate(perv => !perv)
           return console.log(data);
        }
        console.log(data);
        return 
    })
  }

    useEffect(() => {
      getBanner(id ,(isOk ,data) => {
        if(isOk){
          
          setActive(data.response.banner.isActive)
          data.response.banner.users &&
          data.response.banner.users.map(item => {
            return(
              item.key = item._id
            )
          })
          console.log(data.response.banner);
          return setBanner(data.response.banner)
        }else{
          return console.log(data);
        }
      })
    } ,[update])

    const bannerUserArr = []

    const exportDate = banner.users ?
    banner.users.map(item => {
      return(
        bannerUserArr.push(
          {
            name:item.name,
            family:item.family,
            mobileNumber:item.mobileNumber,
            email:item.email,
          }
        )
      )
    })
    :
    {}

    const dataSource = banner.users ? [
      ...banner.users ,
    ] :
    []
    
    const columns = [
      {
        title: ' ایمیل',
        dataIndex: 'email',
        key: 'email',
        align:"right"
      },
      {
        title: 'شماره تماس',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        align:"right"
      },
      {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
        align:"right"
      },
      {
        title: 'نام خانوادگی',
        dataIndex: 'family',
        key: 'family',
        align:"right"
      },
    ];
    
    return ( 
      <>
      <div className = {style.container} >
      <img src={ banner.resources ? banner.resources.icon : noPhoto} alt="banner" style={{width:300 ,height:300 ,alignSelf:"center" ,borderRadius:"1rem"}} />
      <div className = { style.detailsContainer}>
        <div className={style.activationContainer}>
          <Button  onClick = {handleActivation} type="primary" >{banner.isActive ? "غیر فعال کردن" : "فعال کردن"} </Button>
          <h3 dir='rtl'>{banner.name}</h3>
        </div>

          <p dir='rtl' className={style.description}>{banner.description}</p>
          <a href={banner.link} target={'_blank'} rel="noreferrer" ><span> لینک : </span>{banner.link}</a>
          <p className={style.platform}> {banner.platform} برای </p>
          <div className = {style.btnContainer}>
              <span className = { style.price}> تعداد کلیک : {banner.users ? banner.users.length : 0}</span>
              <BannerModal update = {update} setUpdate={setUpdate} appearance = {banner.appearance ? banner.appearance : ""} bannerData = {banner} />
          </div>
              <Link className={style.linkTag} to = {"/banners"} >بازگشت به صفحه بنرها</Link>
      </div>     
  </div>
        <Table style={{width:"100%"}} dataSource={dataSource} columns={columns} pagination={{pageSize:5}} />
        <ReportsExport csvData={bannerUserArr} fileName={`لیست کلیک کنندگان بنر ${banner.name}`} />
      </>
     );
}
 
export default Banner;