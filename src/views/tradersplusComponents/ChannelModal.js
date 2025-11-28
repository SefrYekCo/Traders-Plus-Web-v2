/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';

import {Input ,Button ,Modal, Select} from "antd";
import styles from "./channelModal.module.css";
import { toast } from 'react-toastify';

import {EditFilled, SmileOutlined} from "@ant-design/icons";

import { editChannel } from 'src/api/channelAPI';


const {TextArea} = Input

const {Option} = Select

const ChannelModal = ({id ,setUpdate ,plans ,categories ,itemData}) => {

    const [channel ,setChannel] = useState({
        name:itemData.name,
        bio:itemData.bio,
        categoryId:itemData.category._id,
        planId:itemData.plan._id,
    })

    const [isModalVisible ,setIsModalVisible] = useState(false)



    const handleOk = () => {

        const data = {
            id,
            name:channel.name,
            bio:channel.bio,
            categoryId:channel.categoryId,
            planId:channel.planId,
            password: "sefryek3914!@#$"
        }

        console.log(data);

        editChannel(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setChannel({
                    name:channel.name,
                    bio:channel.bio,
                    categoryId:channel.categoryId,
                    planId:channel.planId,
                })
                setIsModalVisible(false);
                toast.success("ویرایش کانال با موفقیت انجام شد")
                return setTimeout(() => {
                    setUpdate(perv => !perv)
                }, 2500); 
            }
            console.log(info);
            return toast.error("خطا در ویرایش کانال")
        })
    };

    const handleCancel = () => {
        setChannel({
            name:itemData.name,
            bio:itemData.bio,
            categoryId:itemData.category.name,
            planId:itemData.plan.name
        })
        setIsModalVisible(false);
    };

    const changeHandler = (e) => {
        setChannel({...channel ,[e.target.name]:e.target.value})
    }

    const modalHandler = () => {
        setIsModalVisible(true)
        
    }

    const planChangeHandler = (e) => {
 
        setChannel({...channel ,["planId"]:e})
    }

    const categoriesChangeHandler = (e) => {
 
        setChannel({...channel ,["categoryId"]:e})
    }

    return ( 
        <>
            <Button className={styles.btn} onClick={modalHandler}>
                ویرایش کانال
            </Button>
         {/* <EditFilled onClick={showModal} className={styles.showIcon} /> */}
        
        <Modal centered zIndex={99} className={styles.modal} title=" ویرایش کانال" visible={isModalVisible} cancelText="منصرف شدم" okText="ویرایش" onCancel={handleCancel} onOk={handleOk}   >
            
            <Input className={styles.input}  type={"text"} dir='rtl' placeholder=' نام جدید' name="name" onChange={changeHandler} value={channel.name} />
           
            <Input className={styles.input}  type={"text"} dir='rtl' placeholder=' بیو جدید' name="bio" onChange={changeHandler} value={channel.bio} />
            <div className={styles.selectContainer}>
                
            <Select value={channel.planId} onChange={planChangeHandler} className={styles.select} >
                {
                    plans.map(item => {
                        return(
                            <Option style={{textAlign:"right"}} key={item._id} value={item._id} > {item.name} </Option>
                        )
                    })
                }
            </Select>
            <Select value={channel.categoryId} onChange={categoriesChangeHandler} className={styles.select} >
                {
                    categories.map(item => {
                        return(
                            <Option style={{textAlign:"right"}}  key={item._id} value={item._id} > {item.name} </Option>
                        )
                    })
                }
            </Select>
            </div>
            
        </Modal>
      </>
     );
}
 
export default ChannelModal;