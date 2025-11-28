import React, { useRef } from 'react';
import { Space, Table, Tag  ,Button, Dropdown, Menu} from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUserByPhoneNumber } from 'src/api/userApi';
import { toast } from 'react-toastify';
import styles from "./userByPhoneNumber.module.css";
import { isoDateToJalaliDate } from 'src/helpers/helperFunctions';
import { DownOutlined } from '@ant-design/icons';
import { getPlansForAdmin } from 'src/api/plansApi';
import UserByPhoneNumberModal from './userByPhoneNumberModal';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const UserByPhoneNumber = () => {
 
    const textareaRef = useRef()

    const [search ,setSearch] = useState('');
    const [userInfo ,setUserInfo] = useState([{
        key:"",
        name:"",
        family:"",
        isActive : "",
        fcm : "",
        fcmExpireDate : "",
        plans:[],
        web_notification_token:"",
        web_notification_token_date:""
    }])
    const [listOfPlans ,setListOfPlans] = useState([]);
    const [expandedRow, setExpandedRow] = useState(0);
    const [showTable ,setShowTable] = useState(false)
    const [copy ,setCopy] = useState(false)
    const [copyNotificationToken ,setCopyNotificationToken] = useState(false)

    useEffect(() => {
        getPlansForAdmin((isOk ,data) => {
          if(isOk){
            return setListOfPlans(data.response.plans)
          }
          return 
        })
      },[])

    const changeHandler = (e) => {
        setSearch(e.target.value)
    }

    const validator = (phoneNumber) => {
        const number = String(phoneNumber)
        if(number.length != 11){
            toast.warn("شماره موبایل باید 11 رقمی باشد")
            return false
        }  
        return true
    }


    const clickHandler = (e) => {
        e.preventDefault()

        if(!validator(search)) return

        getUserByPhoneNumber(search ,(isOk ,data) => {
            if(isOk){
                console.log(data.response);
                const information = data.response;
                setUserInfo([{
                    key:information._id,
                    _id:information._id,
                    name: information.name ? information.name : "",
                    family: information.family ? information.family : "",
                    isActive : information.isActive = true ? "فعال" : "غیر فعال",
                    fcm : information.fcm ? information.fcm.token : " ",
                    fcmExpireDate : information.fcm ? isoDateToJalaliDate(information.fcm.expireDate) : "",
                    plans:information.plans.length > 0 ? information.plans : [],
                    web_notification_token_date:information.web_notification_token_date,
                    web_notification_token:information.web_notification_token
                }])
                return setShowTable(true)
            }
            return toast.error(data.response.data.message)
        })
    }

  
  const menu = (e) => {
   
      return(
      <Menu>
        <Menu.Item key={e.key}> 
            <UserByPhoneNumberModal allPlans={listOfPlans} userPlans={userInfo[0].plans} />
        </Menu.Item>
      </Menu>
    
      )
    }

    const columns = [

        { title: 'عملیات', key: 'operation', align:"right", render: (e) => {
            return(
            <Space size="middle">
              <Dropdown overlay={menu(e)} trigger={['click']}>
                <a className={styles.link} >
                 <DownOutlined /> بیشتر
                </a>
              </Dropdown>
            </Space>
            )
          }
          },
        { title: 'شناسه', dataIndex: '_id', key: '_id' ,align:"right"  },
        { title: 'ایمیل', dataIndex: 'email', key: 'email',className:"headerOfTable" ,align:"right" },
        { title: 'نام‌خانوادگی', dataIndex: 'family', key: 'LastName' ,align:"right"  },
        { title: 'نام', dataIndex: 'name', key: 'FirstName',className:"headerOfTable" ,align:"right" },
        { title: 'fcm', dataIndex: 'fcm', key: 'fcm' ,align:"right" ,render: (e) => {
            return(
              <CopyToClipboard text={userInfo[0].fcm} onCopy={() => setCopy(true)} >
                 <Button type={"text"} style={copy ? {backgroundColor:"green" ,color:"#ffffff"} : {backgroundColor:"blue" ,color:"#ffffff"}}>
                     copy fcm
                 </Button>
              </CopyToClipboard>
            )
          } },
          { title: 'تاریخ انقضا fcm', dataIndex: 'fcmExpireDate', key: 'fcmExpireDate' ,align:"right" },
          { title: 'web notification token', dataIndex: 'web_notification_token', key:'webNotificationToken' ,align:"right" ,render: (e) => {
            return(
              <CopyToClipboard text={userInfo[0].web_notification_token} onCopy={() => setCopyNotificationToken(true)} >
                 <Button type={"text"} style={copyNotificationToken ? {backgroundColor:"green" ,color:"#ffffff"} : {backgroundColor:"blue" ,color:"#ffffff"}}>
                     copy notification token
                 </Button>
              </CopyToClipboard>
            )
          } },
        { title: 'تاریخ انقضا token', dataIndex: 'web_notification_token_date', key:'web_notification_token_date',className:"headerOfTable" ,align:"right" },
        { title: 'isActive', dataIndex: 'isActive', key: 'isActive' ,align:"right"  },
      ];

    return ( 
        <div className={styles.mainContainer}>
            <div className={styles.firstContainer} >
                <Button type="button" onClick={clickHandler}>جستجو</Button>
                <input type="text" name="phoneNumber" value={search} onChange={changeHandler} placeholder={"شماره موبایل را وارد کنید"} />
                <textarea style={{display:"none"}} ref={textareaRef}  />
            </div>
            <div className={styles.secondContainer} style = {showTable ? {display:"block"} : {display:"none"}} >
            <Table 
                columns={columns}
                dataSource={userInfo}

            />
            </div>

        </div>
     );
}
 
export default UserByPhoneNumber;

