/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
 import { deleteMessage, getMessageV2, sendMessage } from 'src/api/messagesAPI';
import { useLocation } from 'react-router-dom';
import styles from "./messages.module.css";
import { convertToGorgeousDate, isoDateWithoutTimeToJalaliDate } from 'src/helpers/helperFunctions';

import noImage from "../../../images/no-image-icon-23485 (1).png"
import { Button, Input } from 'antd';

import {HeartFilled ,SendOutlined ,FileImageFilled ,SmileOutlined, CloseCircleFilled, DeleteFilled} from "@ant-design/icons";
import EmojiPicker from '../helperComponets/EmojiPicker';
import MessageModal from './MessageModal';

import { Pagination } from 'antd';

const {TextArea} = Input

const Messages = () => {

    const inputRef = useRef()
    const messagesEndRef = useRef(null)

    const [newMessage ,setNewMessage] = useState({
        link:"",
        title:""
    })
    const [text ,setText] = useState("")
    const [messages ,setMessages] = useState([])
    const [showHandler ,setShowHanlder] = useState(false)
    const [image ,setImage] = useState({})
    const [showImage ,setShowImage] = useState(null)
    const [chosenEmoji, setChosenEmoji] = useState("");
    const [search ,setSearch] = useState("");
    const [nextPage ,setNextPage] = useState(false)

    const [page ,setPage] = useState(1)

    const [update, setUpdate] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);
    const location = useLocation()
    const channelId = location.pathname.split("/")[2]

    useEffect(() => {
        getMessageV2(channelId ,page - 1 ,(isOk ,data) => {

            if(isOk){
                console.log(data);
                data.response.messages.reverse()
                setMessages(data.response.messages)
                if(data.response.messages.length === 0){
                    setIsEmpty(true)
                }
                return 
            }
            toast.error("خطا در دریافت پیام ها")
            return 
        })
        getMessageV2(channelId ,page ,(isOk ,data) => {
            
            if(isOk){
                if(data.response.messages.length > 0){
                    return setNextPage(true)
                }
                return setNextPage(false)
            }
            toast.error("خطا در دریافت پیام های صفخه بعد")
            return 
        })
       
    } ,[update ,page])

    const changePageHandler = (e) => {
        setPage(e)
        console.log(e);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [messages]);

      useEffect(() => {
          if(chosenEmoji.emoji){
              setText(text+chosenEmoji.emoji)
          }
      }, [chosenEmoji]);


    const fileUploadClick = () => {
        inputRef.current.click()
    }

    const imageHandler = (e) => {
        console.log(e.target.files);
        setImage(e.target.files[0])
        
        const reader = new FileReader()
        reader.onload = (e) => {
          setShowImage(e.target.result)
         }
         
        reader.readAsDataURL(e.target.files[0])
    }

    const deleteImageHandler = () => {
        setShowImage(null)
        setImage({})
    }

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    const newMessageHandler = (e) => {
        setNewMessage({...newMessage , [e.target.name]:e.target.value})
    }

    const emojiShowHandler = () => {
        setShowHanlder(perv => !perv)
    }

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const deleteHandler = (id) => {

        const data = {
            id,
            password:"sefryek3914!@#$"
        }

        console.log(data);

        deleteMessage(data ,(isOk ,info) => {
            if(isOk){
                console.log(info);
                toast.success("پیام با موفقیت حذف شد")
                setTimeout(() => {
                    setUpdate(perv => !perv)
                }, 3000);
                return
            }
            toast.error("خطا در حذف پیام")
            return console.log(info);
        })
    }

    const submitHandler = () => {

        const formData = new FormData();
        formData.append("content" , text);
        formData.append("password" , "sefryek3914!@#$");
        formData.append("title" , newMessage.title);
        formData.append("image" , image);
        formData.append("link" , newMessage.link);
        formData.append("channelId" , channelId);

        sendMessage(formData , (isOk ,data) => {
            if(isOk){
                console.log(data);
                toast.success("پیام جدید با موفقیت فرستاده شد")
                setText("")
                setChosenEmoji("")
                setImage({})
                setShowImage(null)
                setShowHanlder(false)
                setNewMessage({
                    link:"",
                    title:""
                })
                setTimeout(() => {
                    setUpdate(perv => !perv)
                }, 3000);
                return
            }
            toast.error("خطا در ارسال پیام")
            return console.log(data);
        } )
    }

    const filterMessages = messages.filter((item) => item.content.toLowerCase().includes(search))
    
    return ( 
        <div className={styles.mainContainer} >
            <div className={styles.searchInputContainer}>
            <input  className={styles.searchInput} type="text" name="search" value={search} placeholder={"جستجو بر اساس متن"} onChange={searchHandler} />
                
            </div>
            {
               
                filterMessages.length === 0 && isEmpty 
                ?
                <h1 className={styles.emptyChannel}> پیامی در این کانال وجود ندارد </h1>
                :
                filterMessages.map((item) => {
                    return(
                        <div key={item._id} className={styles.messagesContainer}>
                            <p className={styles.publisher}>{item.publisher && item.publisher.name} { item.publisher &&  item.publisher.family} </p>
                            {
                                item.file &&

                                <img src={item.file ? item.file : noImage} className={styles.showImage} alt="photo" />
                            }
                            {
                                item.title &&
                            <h4  className={styles.title}>
                               {item.title}
                            </h4>
                            }
                            <p className={styles.content}>
                               {item.content}
                            </p>
                            {
                                item.link &&
                            <a href={item.link} className={styles.link}>
                               {item.link}
                            </a>
                            }
                           
                            <div className={styles.footerPart}>
                                    <p className={styles.time}> <span>{item.createdAt.split(" ")[1]} </span>  { convertToGorgeousDate(item.createdAt.split(" ")[0]) } </p>
                                    <div className={styles.likes} >
                                <MessageModal id={item._id} setUpdate={setUpdate} messages = {messages} />
                                        <DeleteFilled style={{marginLeft:"10px"}} className={styles.deleteIcon} onClick={ () =>{ deleteHandler(item._id)}} />
                                        <span>{item.likeCount} </span> 
                                        <HeartFilled style={{color:'red'}} /> 
                                    </div>
                            </div>
                            <div ref={messagesEndRef} />
                        </div>
                        
                    )
                })
            }
            <Pagination showSizeChanger={false} style={{alignSelf:"center"}} defaultCurrent={1} total={nextPage ? page*10 + 10 : page*10} onChange={changePageHandler} current = {page} />
            <div className={styles.sendMessageContainer}>
                <input ref={inputRef} onChange={imageHandler} type="file" name="file"  />
                <Button onClick={fileUploadClick} type='primary'>
                    <FileImageFilled  /> 
                </Button>
                <div style={showImage ? {display:"flex" ,width:"20%" ,borderRadius:"1rem" ,margin:"0 5px" } : {display:"none"}} >
                    <img src={showImage} alt="photo" style={{width:"100%" ,borderRadius:"1rem" }} />
                    <CloseCircleFilled onClick={deleteImageHandler} style={{position:"relative" ,right:"15%" ,width:"0" ,top:".5rem" ,color:"red"}} />
                </div>
                <div className={styles.textareaContainer}>
                <SmileOutlined className={styles.icon} onClick={emojiShowHandler} />
                <EmojiPicker showHandler={showHandler} choosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji}  />
                <div className={styles.inputsContainer}>
                    <Input value={newMessage.title}  className={styles.titleInput} name={"title"} onChange={newMessageHandler} placeholder={'عنوان پیام'}  />
                    <TextArea className={styles.sendMessageTextarea} onChange={changeHandler} value={text} placeholder={"متن پیام "} />
                    <Input value={newMessage.link}  className={styles.linkInput} name={"link"} onChange={newMessageHandler} placeholder={'لینک پیام'}  />
                </div>
                </div>
               
                <Button onClick={submitHandler} type='primary'>
                    <SendOutlined /> 
                </Button>
                
            </div>
        </div>
     );
}
 
export default Messages;