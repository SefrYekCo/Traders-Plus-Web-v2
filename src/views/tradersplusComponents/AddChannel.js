import { Button, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {Form} from "react-bootstrap"
import { toast } from 'react-toastify';
import { createBanner } from 'src/api/bannersApi';
import { getCategories } from 'src/api/categoryApi';
import { createChannel } from 'src/api/channelAPI';
import { getPlansForAdmin } from 'src/api/plansApi';

import styles from "./addChannel.module.css";
import ImageUploader from './helperComponets/ImageUploader';

const AddChannel = () => {

    const { Option } = Select;

    const [loadingBtn ,setLoadingBtn] = useState(false)
    const [plans ,setPlans] = useState([])
    const [selectedPlan ,setSelectedPlan] = useState("پلن ها")
    const [categories ,setCategories] = useState([])
    const [selectedCategory ,setSelectedCategory] = useState("دسته بندی ها")
    const [icon ,setIcon] = useState({})
    const [channelData ,setChannelData] = useState({
        bio:"",
        name:"",
        password:"sefryek3914!@#$",
    })

    useEffect(() => {
        getPlansForAdmin((isOk ,data) => {
            if(isOk){
                console.log(data.response.plans);
                return setPlans(data.response.plans)
            }
            return console.log(data);
        })
        getCategories((isOk ,data) => {
            if(isOk){
                console.log(data.response.categories);
                return setCategories(data.response.categories)
            }
            return console.log(data);
        })
    } , [])


    const changeHandler = (e) => {
          setSelectedCategory(e)
    }

    const changePlanHandler = (e) => {
          setSelectedPlan(e)
    }

    const channelChangeHandler = (e) => {
        setChannelData({...channelData ,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        setLoadingBtn(true)
      e.preventDefault()
      const formData = new FormData()

      console.log(selectedCategory);
      console.log(selectedPlan);
      console.log(channelData);
      console.log(icon);

      formData.append("name" ,channelData.name)
      formData.append("bio" ,channelData.bio)
      formData.append("categoryId" ,selectedCategory)
      formData.append("planId" ,selectedPlan)
      formData.append("icon" ,icon)
      formData.append("password" ,channelData.password)

      createChannel(formData ,(isOk ,data) => {
        if(isOk){
            toast.success("کانال جدید با موفقیت ساخته شد")
            setChannelData({
                bio:"",
                name:"",
                password:"sefryek3914!@#$",
            })
            setSelectedPlan("پلن ها")
            setSelectedCategory("دسته بندی ها")
            setLoadingBtn(false)
            return console.log(data);
        }
        setLoadingBtn(false)
        return toast.error("خطا در ساخت کانال")
      })
    }

    return ( 
        
            <Form onSubmit={submitHandler} className = {styles.formContainer} >
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                   
                    <Form.Control onChange={channelChangeHandler} value={channelData.name} type="text" name='name' dir='rtl' placeholder="نام کانال" className='w-100' />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
                    
                    <Form.Control onChange={channelChangeHandler} value={channelData.bio} as="textarea" name='bio' dir='rtl' placeholder='بیو کانال' className='w-100' rows={3} style={{resize:"none"}} />
                </Form.Group>
                <Select dir='rtl' value={selectedCategory} placeholder="دسته بندی ها" name='category' onChange={changeHandler} aria-label="Default select example" className='mt-3 w-100 rtl'>

                {categories.map((item) => {
                        return(
                            <Option key={item._id} value={item._id} dir="rtl" className="pe-3"  >{item.name}</Option>
                        )
                    })}

                </Select>
                <Select dir='rtl' value={selectedPlan}  placeholder="پلن ها" name='plan' onChange={changePlanHandler} aria-label="Default select example" className="mt-3 w-100 rtl" >
                        
                        {plans.map((item) => {
                        return(
                            <Option dir="rtl"  key={item._id} value={item._id} className="pe-3" >{item.name}</Option>
                        )
                    })}
                </Select>
                <div className="w-100 mt-3 mb-5">
                <ImageUploader  width={"80%"} height={"300px"} setIcon={setIcon} />
                    
                </div>
                <div className="col-md-2 w-100 d-flex justify-content-end ">      
                    <Button
                        type="primary"
                        loading={loadingBtn}
                        onClick={submitHandler}
                        className="mb-2"
                    >
                    ساخت کانال
                    </Button>
                </div>
            </Form>
        
     );
}
 
export default AddChannel;