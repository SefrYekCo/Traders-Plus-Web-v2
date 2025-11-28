/* eslint-disable react/prop-types */

import { Card, Input ,Modal } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined ,DeleteOutlined } from "@ant-design/icons";
import { Button } from 'antd';

import styles from "./addTypesModal.module.css";
import { numberWithCommas, planTypesValidation } from 'src/helpers/helperFunctions';

const AddTypesModal = ({types ,setTypes}) => {

    const [newType ,setNewType] = useState({
        amount:"",
        period:"",
        discount:""
    })

    const changeHandler = (e) => {
        setNewType({...newType ,[e.target.name]:e.target.value})
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(types);

         if(planTypesValidation(newType)){

             types.push(
                 {
                     amount:newType.amount,
                     period:newType.period,
                     discount:parseInt( newType.discount)
                 }
             )
             
         setTypes([...types])
    
             setNewType({
                 amount:"",
                 period:"",
                 discount:""
                })
             setIsModalVisible(false);
         } 

    };

    const handleCancel = () => {
       setNewType({
        amount:"",
        period:"",
        discount:""
       })
        setIsModalVisible(false);
    };

    const deleteType = (index) => {
        types.splice(index ,1)

        setTypes([...types])

    }

    return ( 
        <>
     
        <Button type="default" className={styles.btn} onClick={showModal}>
         <PlusOutlined />
        </Button>
        {
            types.length > 0 &&
            types.map((item ,index) => {
                return(
                <Card key={index} 
                hoverable 
                className={styles.typeContainer} 
                actions={[
                  <DeleteOutlined onClick={ () => deleteType(index)} key="elipsis" /> ,
                  
                   ]}
                >
                    <p className={styles.amount}> قیمت : {item.amount}  </p>
                    <p> مدت زمان پلن: {item.period} </p>
                    <p> تخفیف: {item.discount} </p>
                </Card>

                )
            })
        }
        <Modal centered  zIndex={1200} title=" نوع پلن" visible={isModalVisible} cancelText="منصرف شدم" okText="اضافه شود" onCancel={handleCancel} onOk={handleOk}   >
          
            <Input className={styles.input} type={"number"} dir='rtl' min={0} placeholder='مبلغ (ریال)' name="amount" onChange={changeHandler} value={ newType.amount } />
            <Input  className={styles.input} type={"number"} dir='rtl' min={0} placeholder=' مدت زمان(روز)' name="period" onChange={changeHandler} value={newType.period} />
            <Input  className={styles.input} type={"number"} dir='rtl' min={0} placeholder=' تخفیف (ریال)' name="discount" onChange={changeHandler} value={newType.discount} />

        </Modal>
      </>
     );
}
 
export default AddTypesModal;