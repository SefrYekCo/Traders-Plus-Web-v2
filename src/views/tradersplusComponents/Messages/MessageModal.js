/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';

import {Input ,Button ,Modal} from "antd";
import styles from "./messageModal.module.css";
import { toast } from 'react-toastify';

import { editMessage } from 'src/api/messagesAPI';

import {EditFilled, SmileOutlined} from "@ant-design/icons";
import EmojiPicker from '../helperComponets/EmojiPicker';

const {TextArea} = Input

const MessageModal = ({id ,setUpdate ,messages}) => {

    const [message ,setMessage] = useState({
        content:"",
        title:"",
        link:''
    })

    const [editMessageData ,setEditMessageData] = useState({
        content:"",
        title:"",
        link:""
    })
    const [text ,setText] = useState("")
    const [chosenEmoji, setChosenEmoji] = useState("");
    const [showHandler ,setShowHanlder] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
      messages.find(item => {
        if(item._id === id){
            return(
                setMessage({
                    content:item.content,
                    title:item.title,
                    link:item.link
                })
            )
            }
        })
        
    } ,[messages])

    useEffect(() => {
        setEditMessageData({
            title:message.title,
            link:message.link
        })

        setText(message.content)

    } ,[message])

    const handleOk = () => {

        const data = {
            content:text,
            link:editMessageData.link,
            password:"sefryek3914!@#$",
            id,
            title:editMessageData.title,
        }

        console.log(data);

        editMessage(data, (isOk ,info) => {
            if(isOk){
                console.log(info);
                setMessage({
                    title:"",
                    link:""
                })
                setText("")
                setChosenEmoji("")
                setIsModalVisible(false);
                toast.success("ویرایش پیام با موفقیت انجام شد")
                return setTimeout(() => {
                    setUpdate(perv => !perv)
                }, 3000); 
            }
            console.log(info);
            return toast.error("خطا در ویرایش پیام")
        })
    };

    useEffect(() => {
        if(chosenEmoji.emoji){
            setText(text+chosenEmoji.emoji)
        }
    }, [chosenEmoji]);

    const handleCancel = () => {
        setEditMessageData({
            title:message.title ,
            link:message.link
        })
        setText(message.content)
        setChosenEmoji("")
        setIsModalVisible(false);
    };

    const changeHandler = (e) => {
        setEditMessageData({...editMessageData ,[e.target.name]:e.target.value})
    }

    const textChangeHandler = (e) => {
        setText(e.target.value)
    }

    const emojiShowHandler = () => {
        setShowHanlder(perv => !perv)
    }

    return ( 
        <>
        <EditFilled onClick={showModal} className={styles.showIcon} />
        
        <Modal centered zIndex={1200} title=" ویرایش پیام" visible={isModalVisible} cancelText="منصرف شدم" okText="ویرایش" onCancel={handleCancel} onOk={handleOk}   >
        
            <Input className={styles.input}  type={"text"} dir='rtl' placeholder=' عنوان جدید' name="title" onChange={changeHandler} value={editMessageData.title} />
                <SmileOutlined className={styles.icon} onClick={emojiShowHandler} />
                <div className={styles.emojiPickerContainer} >
                <EmojiPicker showHandler={showHandler} choosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji} />
                </div>
            <TextArea  className={styles.textarea}  type={"text"} dir='rtl' placeholder='متن جدید ' name="content" onChange={textChangeHandler} value={text} />
            <Input className={styles.input}  type={"text"} dir='rtl' placeholder=' لینک جدید' name="link" onChange={changeHandler} value={editMessageData.link} />
            
        </Modal>
        </>
     );
}
 
export default MessageModal;