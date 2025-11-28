/* eslint-disable react/prop-types */
import React, {useState} from 'react';

import {Input ,Button ,Modal} from "antd"
import styles from "./typeModal.module.css"
import { toast } from 'react-toastify';
import { editPlanType } from 'src/api/plansApi';

const TypeModal = ({id ,typeId ,setUpdate ,planData }) => {
    console.log(planData);

    const [editTypeData ,setEditTypeData] = useState({
        amount:planData.amount,
        period:planData.period,
        discount:planData.discount
    })

    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const typeActivationHandler = (e) => {

        const data = {
            amount:`${editTypeData.amount}` ,
            discount:+editTypeData.discount,
            period:`${editTypeData.period}`,
            password:"sefryek3914!@#$",
            id,
            isActive:planData.isActive ? false : true,
            typeId
        }

        editPlanType(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setUpdate(perv => !perv)
                setIsModalVisible(false);
                return  toast.success("ادیت پلن با موفقیت انجام شد")
            }
            console.log(info);
            return toast.error("خطا در ادیت پلن")
        })
    }

    const handleOk = () => {

        const data = {
            amount:`${editTypeData.amount}` ,
            discount:+editTypeData.discount,
            password:"sefryek3914!@#$",
            id,
            isActive:true,
            period:`${editTypeData.period}`,
            typeId
        }


        // console.log(data);

        editPlanType(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setUpdate(perv => !perv)
                setIsModalVisible(false);
                return  toast.success("ادیت پلن با موفقیت انجام شد")
            }
            console.log(info);
            return toast.error("خطا در ادیت پلن")
        })
    };

    const handleCancel = () => {
        setEditTypeData({
            amount:planData.amount,
            period:planData.period,
            discount:planData.discount
        })
        setIsModalVisible(false);
    };

    const changeHandler = (e) => {
        setEditTypeData({...editTypeData ,[e.target.name]:e.target.value})
    }



    return ( 
        <>
        <Button type="default" className={styles.btn} onClick={showModal}>
         ویرایش 
        </Button>
        <Modal centered className={styles.modal}  zIndex={1200} title=" ویرایش پلن" visible={isModalVisible} cancelText="منصرف شدم" okText="ویرایش" onCancel={handleCancel} onOk={handleOk}   >
            <Button type="default" className={styles.btn}  onClick={typeActivationHandler}>
             {planData.isActive ? 'غیرفعال کردن' : "فعال کردن"}
            </Button>
            <p>  قیمت (ریال) </p>
            <Input  className={styles.input} min={0} type={"number"} dir='rtl' placeholder=' قیمت جدید (ریال)' name="amount" onChange={changeHandler} value={editTypeData.amount} />
            <p> مدت زمان (روز) </p>
            <Input  className={styles.input} min={0} type={"number"} dir='rtl' placeholder='مدت زمان (روز) ' name="period" onChange={changeHandler} value={editTypeData.period} />
            <p> تخفیف (ریال) </p>
            <Input  className={styles.input} min={0} type={"number"} dir='rtl' placeholder=' تخفیف (ریال)' name="discount" onChange={changeHandler} value={editTypeData.discount} />
            
        </Modal>
      </>
     );
}
 
export default TypeModal;