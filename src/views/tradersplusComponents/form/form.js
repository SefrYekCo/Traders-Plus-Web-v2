import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import { convertAgeValueToPersion, convertQuantityValueToPersion, convertTermValueToPersion, isoDateToJalaliDate } from 'src/helpers/helperFunctions';
import styles from './form.module.css';
import { ReportsExport } from '../export/Export';


const Form = () => {

    const url =  process.env.REACT_APP_MODE === "production" ? "http://185.208.175.105:4001/get" : "http://94.182.191.37:4001/get"

    const [data ,setData] = useState([])
    const [search ,setSearch] = useState('')

    useEffect(async() => {
        const res = await axios.get(url, {
            headers:{
                password:"w9xsbfMmj(5AqeR^"
            }
        })
        // console.log(res.data.response.forms);
        setData(res.data.response.forms)
        
    } ,[])

    const changeHandler = (e) => {
        setSearch(e.target.value)
    }

    const columns = [
        {
          title: 'نام',
          dataIndex: 'name',
          key: 'name',
          align:"right",
          sorter: {
            compare: (a, b) => a.name && a.name.localeCompare(b.name),
          },
        },

        {
          title: 'سن',
          dataIndex: 'age',
          key: 'age',
          align:"right",
          sorter: {
            compare: (a, b) => a.age && a.age.localeCompare(b.age),
          },
        },

        {
          title: 'شماره موبایل',
          dataIndex: 'mobileNumber',
          key: 'mobileNumber',
          align:"right",
          sorter: {
            compare: (a, b) => a.mobileNumber - b.mobileNumber,
          },
        },

        {
          title: 'شماره ثابت',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
          align:"right",
          sorter: {
            compare: (a, b) => a.phoneNumber - b.phoneNumber,
          },
        },

        {
          title: 'مبلغ سرمایه گزاری',
          dataIndex: 'quantity',
          key: 'quantity',
          align:"right",
          sorter: {
            compare: (a, b) => a.quantity && a.quantity.localeCompare(b.quantity),
          },
        },

        {
          title: '  مدت سرمایه گزاری',
          dataIndex: 'term',
          key: 'term',
          align:"right",
          sorter: {
            compare: (a, b) => a.term && a.term.localeCompare(b.term),
          },
        },

        {
            title: 'تاریخ ساخت  ',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align:"right",

        },
       
      ];


      const dataArr = []

      for (let i = 0; i < data.length; i++) {
        dataArr.push({
            key: i,
            name: data[i].name,
            age: convertAgeValueToPersion(data[i].age) ,
            mobileNumber: data[i].mobileNumber,
            phoneNumber: data[i].phoneNumber,
            quantity: convertQuantityValueToPersion(data[i].quantity),
            term: convertTermValueToPersion(data[i].term),
            createdAt: isoDateToJalaliDate(data[i].createdAt),
        })
        
      }

      const filterDate = dataArr.filter((item) => item.mobileNumber.toLowerCase().includes(search.toLowerCase()))

return(
    <div className={styles.container}>
        <input type="text" value={search} onChange={changeHandler} placeholder={"جستجو براساس شماره موبایل"} /> 
        <Table columns={columns} dataSource={filterDate} />
        <ReportsExport csvData={dataArr} fileName={"فرم"} />
    </div>
)
};



export default Form;