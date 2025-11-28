/* eslint-disable react/prop-types */
import React, {useState} from 'react';

import {Input ,Button ,Modal} from "antd"
import styles from "./planModal.module.css"
import { toast } from 'react-toastify';
import { editPlan } from 'src/api/plansApi';

const PlanModal = ({id ,setUpdate ,description ,name}) => {

    const [editPlanData ,setEditPlanData] = useState({
        name,
        description
    })

    const {TextArea} = Input;
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        const data = {
            name:editPlanData.name,
            description:editPlanData.description,
            password:"sefryek3914!@#$",
            id,
            isActive:true
        }

        if(editPlanData.name.length === 0){
            delete editPlanData.name
        }
        if(editPlanData.description.length === 0){
            delete editPlanData.description
        }

        console.log(data);

        editPlan(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setUpdate(perv => !perv)
                // setEditPlanData({
                //     name:'',
                //     description:""
                // })
                setIsModalVisible(false);
                return  toast.success("ادیت پلن با موفقیت انجام شد")
            }
            console.log(info);
            return toast.error("خطا در ادیت پلن")
        })
    };

    const handleCancel = () => {
        setEditPlanData({
            name,
            description
        })
        setIsModalVisible(false);
    };

    const changeHandler = (e) => {
        setEditPlanData({...editPlanData ,[e.target.name]:e.target.value})
    }



    return ( 
        <>
        <Button type="primary" className={styles.btn} onClick={showModal}>
         ویرایش پلن
        </Button>
        <Modal centered  zIndex={1200} title=" ویرایش پلن" visible={isModalVisible} cancelText="منصرف شدم" okText="ویرایش" onCancel={handleCancel} onOk={handleOk}   >
          
            <Input className={styles.input} type={"text"} dir='rtl' placeholder='نام پلن' name="name" onChange={changeHandler} value={editPlanData.name} />
            <TextArea  className={styles.input} type={"text"} dir='rtl' placeholder='توضیحات پلن' name="description" onChange={changeHandler} value={editPlanData.description} />

            
        </Modal>
      </>
     );
}
 
export default PlanModal;