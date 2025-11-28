/* eslint-disable react/prop-types */
import React, {useState} from 'react';

import {Input ,Button ,Modal} from "antd"
import styles from "./categoryModal.module.css";
import { toast } from 'react-toastify';
import { editPlan } from 'src/api/plansApi';
import { editCategory } from 'src/api/categoryApi';
import { EditOutlined } from '@ant-design/icons';

const CategoryModal = ({id ,setUpdate}) => {

    const [editCategoryData ,setEditCategoryData] = useState({
        name:'',
    })

    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        const data = {
            name:editCategoryData.name,
            id,
            password:"sefryek3914!@#$"
        }

        console.log(data);

        editCategory(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setUpdate(perv => !perv)
                setEditCategoryData({
                    name:''
                })
                setIsModalVisible(false);
                return  toast.success("ویرایش دسته بندی با موفقیت انجام شد")
            }
            console.log(info);
            return toast.error("خطا در ویرایش دسته بندی")
        })
    };

    const handleCancel = () => {
        setEditCategoryData({
            name:'',
        })
        setIsModalVisible(false);
    };

    const changeHandler = (e) => {
        setEditCategoryData({...editCategoryData ,[e.target.name]:e.target.value})
    }



    return ( 
        <>
        <EditOutlined  className={styles.btn} onClick={showModal}>
         ویرایش دسته بندی
        </EditOutlined>
        <Modal centered  zIndex={1200} title=" ویرایش دسته بندی" visible={isModalVisible} cancelText="منصرف شدم" okText="ویرایش" onCancel={handleCancel} onOk={handleOk}   >
          
            <Input className={styles.input} type={"text"} dir='rtl' placeholder='نام جدید دسته بندی' name="name" onChange={changeHandler} value={editCategoryData.name} />
            
        </Modal>
      </>
     );
}
 
export default CategoryModal;