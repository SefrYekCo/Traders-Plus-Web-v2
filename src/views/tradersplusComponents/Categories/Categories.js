
import React ,{useState ,useEffect} from 'react';
import {activateCategory, getCategories} from "src/api/categoryApi"
import { List, Avatar } from 'antd';
import styles from "./categories.module.css";

import {toast} from "react-toastify"
import { DeleteOutlined } from '@ant-design/icons';
import CategoryModal from './CategoryModal';



const Categories = () => {

    const [categories ,setCategories] = useState([])
    const [update ,setUpdate] = useState(false)

    useEffect(() => {
        if(navigator.onLine === false){
            return toast.error("اتصال به اینترنت خود را چک کنید")
        }

        getCategories((isOk ,data) => {
            if(isOk){
                console.log(data.response.categories);
                return setCategories(data.response.categories)
            }
            console.log(data);
            return toast.error("خطا در دریافت دسته بندی ها")
        })
        
    } ,[update])

    const activationHandler = (id ,isActive) => {

        const data = {
            id,
            isActive:!isActive,
            password:"sefryek3914!@#$"
        }
        console.log(data);
        activateCategory(data ,(isOk ,info) => {
            if(isOk) {
                console.log(info);
                return setUpdate(perv => !perv)
            }
            console.log(info);
            return toast.error("خطا در انجام عملیات")
        })
    }

    return(
        <div className={styles.container}>
            
        <List
        className={styles.list}
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={item => (
              <List.Item key={item._id} className={styles.listItem} style={item.isActive ? {backgroundColor:"#ffffff"} : {backgroundColor:"silver"}} actions={[]} >
              <List.Item.Meta
                
                title={<a>{item.name}</a>}
                description={item.type}
                />
                <div className={styles.actionsContainer}>
                <DeleteOutlined className={styles.deleteIcon} style={{cursor:"pointer"}} onClick={ () => activationHandler(item._id ,item.isActive)} />
                <CategoryModal key={item._id}  id={item._id} setUpdate={setUpdate} />
                </div>
            </List.Item>
          )}
          />
        </div>
    )
    };

export default Categories;