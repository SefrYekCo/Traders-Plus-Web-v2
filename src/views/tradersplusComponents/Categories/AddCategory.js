import { Button, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {Form} from "react-bootstrap"
import { toast } from 'react-toastify';

import {createCategory } from 'src/api/categoryApi';

import styles from "./addCategory.module.css";
import ImageUploader from '../helperComponets/ImageUploader';

const AddCategory = () => {

    const { Option } = Select;

    const [loadingBtn ,setLoadingBtn] = useState(false)
    const [selectedType ,setSelectedType] = useState("")
    const [icon ,setIcon] = useState({})
    const [categoryData ,setCategoryData] = useState({
        type:"",
        name:"",
        password:"sefryek3914!@#$",
    })

    const changeTypeHandler = (e) => {
          setSelectedType(e)
    }

    const channelChangeHandler = (e) => {
        setCategoryData({...categoryData ,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        setLoadingBtn(true)
      e.preventDefault()
      const formData = new FormData()

      formData.append("name" ,categoryData.name)
      formData.append("type" ,selectedType)
      formData.append("icon" ,icon)
      formData.append("password" ,categoryData.password)

      createCategory(formData ,(isOk ,data) => {
        if(isOk){
            toast.success("دسه بندی جدید با موفقیت اضافه شد")
            setCategoryData({
                type:"",
                name:"",
                password:"sefryek3914!@#$",
            })
            setSelectedType("")
            setLoadingBtn(false)
            return console.log(data);
        }
        setLoadingBtn(false)
        return toast.error("خطا در ساخت دسته بندی جدید")
      })
    }

    return ( 
        
            <Form onSubmit={submitHandler} className = {styles.formContainer} >
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                   
                    <Form.Control onChange={channelChangeHandler} value={categoryData.name} type="text" name='name' dir='rtl' placeholder="نام دسته بندی" className='w-100' />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
                    
                <Select dir='rtl'  defaultValue={'نوع دسته بندی'}  name='type' onChange={changeTypeHandler}  className="mt-3 w-100 rtl" >
                    <Option dir="rtl"  value={"info"} className="pe-3" >info</Option>
                    <Option dir="rtl"  value={"channel"} className="pe-3" >channel</Option>
                </Select>
                </Form.Group>
            
                <div className="w-100 mt-3 mb-5">
                <ImageUploader setIcon={setIcon}  width={"80%"} height={"300px"}  />
                    
                </div>
                <div className="col-md-2 w-100 d-flex justify-content-end ">      
                    <Button
                        type="primary"
                        loading={loadingBtn}
                        onClick={submitHandler}
                        className="mb-2"
                    >
                    اضافه کردن
                    </Button>
                </div>
            </Form>
        
     );
}
 
export default AddCategory;