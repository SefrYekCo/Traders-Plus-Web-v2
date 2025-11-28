import { Button, Input, Select } from 'antd';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createPlan } from 'src/api/plansApi';

import styles from "./addPlan.module.css";

import AddTypesModal from './AddTypesModal';

const {Option} = Select
const {TextArea} = Input

const AddPlan = () => {

    const [newPlan ,setNewPlan] = useState({
        name:"",
        description:"",
        type:"",
    })

    const [types ,setTypes] = useState([])
    const [loading ,setLoading] = useState(false)

    const changeHandler = (e) => {
        setNewPlan({...newPlan ,[e.target.name]:e.target.value})
    }

    const typeChangeHandler = (e) => {
        console.log(e);
        setNewPlan({...newPlan ,["type"]:e})
    }

    const submitHandler = () => {
        setLoading(true)
        const data = {
            password:"sefryek3914!@#$",
            name:newPlan.name,
            description:newPlan.description,
            type:newPlan.type,
            types
        }

        console.log(data);

        createPlan(data , (isOk ,info) => {
            if(isOk) {
                console.log(info);
                setNewPlan({
                    name:"",
                    description:"",
                    type:"",
                })
                setTypes([])
                setLoading(false)
                return toast.success("پلن جدید با موفقیت اضافه شد")
            }
            setLoading(false)
            console.log(info);
            return toast.error("خطا در ساخت پلن")
        })
    }

    return ( 
        <div className={styles.container}>
            <Input type={'text'} name="name" value={newPlan.name} onChange={changeHandler} maxLength={50} placeholder='نام پلن' />
            <TextArea name="description" value={newPlan.description} onChange={changeHandler} maxLength={200} placeholder='توضیحات پلن' className={styles.textArea} />
      
            <Select defaultValue={"نوع پلن"} style={{textAlign:"right" ,width:"20%" ,alignSelf:"flex-end"}} onChange={typeChangeHandler}>
                <Option style={{textAlign:"right"}}  value="cryptoSignals" >cryptoSignals</Option>
                <Option style={{textAlign:"right"}}  value="bourseSignals" >bourseSignals</Option>
                <Option style={{textAlign:"right"}}  value="pro" >pro</Option>
                <Option style={{textAlign:"right"}}  value="public" >public</Option>
            </Select>
            <div className ={styles.typesMainContainer}>
                <h4> اضافه کردن مدل پلن </h4>
            <div className={styles.typesContaienr}>
                <AddTypesModal types = {types} setTypes = {setTypes} />
            </div>
            </div>
            <Button type='primary' className={styles.submitBtn} onClick={submitHandler} loading={loading}>
                ساخت پلن
            </Button>
        </div>
     );
}
 
export default AddPlan;