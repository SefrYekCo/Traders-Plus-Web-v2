import React, { useEffect ,useState } from 'react';

import { Button, Divider, Switch ,Badge } from 'antd';
import styles from './setting.module.css';
import { enableNotification } from 'src/api/NotificationApi';
import { toast } from 'react-toastify';
import { checkVersion } from 'src/api/versionApi';

import {} from "../../../helpers/helperFunctions"
import SettingModal from './SettingModal';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const Setting = () => {

    const [version ,setVersion] = useState({})
    const [copied ,setCopied] = useState(false)
    const [update ,setUpdate] = useState(false)

    useEffect(() => {
        console.log(update);
        const data = {
            deviceType:"android"
        }
        checkVersion(data ,(isOk ,info) => {
            if(isOk){
                console.log(info.response);
                return setVersion(info.response.versionResponse)
            }
            toast.error("خطا در دریافت ورژن")
            return console.log(info);
        })
    } ,[update])

    const removeHtmlTag = () => {
        if(version.message){
            return version.message.replace(/(<([^>]+)>)/gi, "");
        }
    }

    const notificationHandler = (e) => {
        
        const data = {
            password:"sefryek3914!@#$",
            enable:e
        }
        console.log(data);
        enableNotification( data ,(isOk ,info) => {
            if(isOk){
                console.log(info);
                if(info.data.response.enable){
                    return toast.success("نوتیفیکیشن ها فعال شدند")
                }
                return toast.success("نوتیفیکیشن ها با موفقیت غیر فعال شدند")
            }
            console.log(info);
            toast.error("عملیات با خطا مواجه شد")
        })
    }


    
    // const clickHandler = async () => {
    //     await navigator.clipboard.writeText(version.updateLink)
    //     setCopied(true)
    // }


    return ( 
        <div className={styles.mainContainer}>
            <div className={styles.notificationMainContainer}>
                <h3>پیام ها</h3>
                <div>
                    <Switch onChange={notificationHandler} />
                    <p  className={styles.ptag}>: فعال و غیر فعال کردن اعلان ها</p>
                </div>
            </div>
            <Divider type='horizontal'  />
            <div className={styles.versionMainContainer} >
            <h3>ورژن بندی</h3>
                <div className={styles.versioningContainer}>
                    <Badge
                        className={styles.badge}
                        count={version.forceVersionCode}
                        style={{ backgroundColor: '#52c41a',fontSize:'medium' }}

                        />
                        <p  className={styles.ptag}> : Force Version Code </p>
                </div>
                <div className={styles.versioningContainer}>
                    <Badge
                        className={styles.badge}
                        count={version.normalVersionCode}
                        style={{ backgroundColor: '#52c41a',fontSize:'medium' }}

                        />
                        <p  className={styles.ptag}> : Normal Version Code </p>
                </div>
                <div className={styles.versioningContainer}>
                    <p className={styles.description} >
                    {removeHtmlTag()}
                    </p>
                        <p className={styles.ptag}> :توضیحات </p>
                </div>
                <div className={styles.versioningContainer}>
                 <p className={styles.updateLink} >
                    <CopyToClipboard text={version.updateLink} onCopy={() => setCopied(true)} >
                    <Button type={"text"} style={copied ? {backgroundColor:"green" ,color:"#ffffff"} : {backgroundColor:"wheat" ,color:"#000"}}>
                        copy link
                    </Button>
                    </CopyToClipboard>
                     {version.updateLink}
                 </p>
                        <p  className={styles.ptag}> : لینک به روز رسانی </p>
                </div>
                <SettingModal setUpdate={setUpdate} version = {version} />
            </div>

        </div>
     );
}
 
export default Setting;