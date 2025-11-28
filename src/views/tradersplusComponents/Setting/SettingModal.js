/* eslint-disable react/prop-types */
import React, {useState} from 'react';

import {Input ,Button ,Modal} from "antd";
import styles from "./settingModal.module.css";
import { toast } from 'react-toastify';
import { editPlanType } from 'src/api/plansApi';
import {changeVersion} from "src/api/versionApi";
import { useEffect } from 'react';

const SettingModal = ({setUpdate ,version }) => {

    const [changeVersionData ,setChangeVersionData] = useState({
        normalVersionCode:version.normalVersionCode,
        forceVersionCode:version.forceVersionCode,
        deviceType:"android",
        message:version.message,
        updateLink:version.updateLink,
    })



    useEffect(() => {
        setChangeVersionData({
            normalVersionCode:version.normalVersionCode,
            forceVersionCode:version.forceVersionCode,
            deviceType:"android",
            message:version.message,
            updateLink:version.updateLink,
        })
    } ,[version])
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        const data = {
            normalVersionCode:changeVersionData.normalVersionCode,
            forceVersionCode:changeVersionData.forceVersionCode,
            deviceType:changeVersionData.deviceType,
            message:changeVersionData.message,
            updateLink:changeVersionData.updateLink,
            password:"sefryek3914!@#$",
          
        }
        
        console.log(data);

        changeVersion(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setChangeVersionData({
                    normalVersionCode:version.normalVersionCode,
                    forceVersionCode:version.forceVersionCode,
                    deviceType:"android",
                    message:version.message,
                    updateLink:version.updateLink,
                })
                setIsModalVisible(false);
                setTimeout(() =>{
                    setUpdate(perv => !perv) 
                } ,2000)
                
                return  toast.success("تغییر ورژن با موفقیت انجام شد")
            }
            console.log(info);
            return toast.error("خطا در تغییر ورژن")
        })
    };

    const handleCancel = () => {
        setChangeVersionData({
            normalVersionCode:version.normalVersionCode,
            forceVersionCode:version.forceVersionCode,
            deviceType:"android",
            message:version.message,
            updateLink:version.updateLink,
        })
        setIsModalVisible(false);
    };

    const changeHandler = (e) => {
        setChangeVersionData({...changeVersionData ,[e.target.name]:e.target.value})
    }



    return ( 
        <>
        <Button type="default" className={styles.btn} onClick={showModal}>
         تغییر ورژن 
        </Button>
        <Modal centered  zIndex={1200} title="تغییر ورژن " visible={isModalVisible} cancelText="منصرف شدم" okText="تغییر ورژن " onCancel={handleCancel} onOk={handleOk}   >
          
            <Input className={styles.input} min={0} type={"number"} dir='rtl' placeholder=' force version code' name="forceVersionCode" onChange={changeHandler} value={changeVersionData.forceVersionCode} />
            <Input  className={styles.input} min={0} type={"number"} dir='rtl' placeholder='normal version code' name="normalVersionCode" onChange={changeHandler} value={changeVersionData.normalVersionCode} />
            <Input className={styles.input} type={"text"} dir='rtl' placeholder=' توضیحات' name="message" onChange={changeHandler} value={changeVersionData.message} />
            <Input className={styles.input} type={"text"} dir='rtl' placeholder='لینک جدید' name="updateLink" onChange={changeHandler} value={changeVersionData.updateLink} />

        </Modal>
      </>
     );
}
 
export default SettingModal;