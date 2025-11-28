import React, { useEffect, useState } from 'react';

import { Table, Badge, Menu, Dropdown, Space ,Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getUsers } from 'src/api/userApi';
import {getPlansForAdmin} from "../../../api/plansApi";

import { isoDateWithoutTimeToJalaliDate, numberWithCommas } from 'src/helpers/helperFunctions';

import { toast } from 'react-toastify';

import styles from "./user.module.css";

import UserModal from './UserPlansModal';
import { ReportsExport } from '../export/Export';



function NestedTable() {

  const [users ,setUsers] = useState([])
  const [usersExport ,setUsersExport] = useState([])
  const [listOfPlans ,setListOfPlans] = useState([])
  const [loading ,setLoading] = useState(false)
  const [pagination ,setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions:[5 ,10 ,15]
  })
  const [expandedRow, setExpandedRow] = useState(0);

  useEffect(() => {

    getUsers( 0 ,1000000 ,(isOk ,data) => {
      if(isOk){
        console.log(data.response.users);
        const usersExportArr = []
        data.response.users.map(item => {
          return(
            usersExportArr.push(
              {
                name:item.name,
                family:item.family,
                mobileNumber:item.mobileNumber,
                email:item.email,
                notifications:item.notifications ? "فعال" : "غیر فعال",
                termsAccepted:item.termsAccepted ? "تایید شده" : "تایید نشده",
                createdAt:isoDateWithoutTimeToJalaliDate(item.createdAt)
              }
            )
          )
        })

        return setUsersExport(usersExportArr)
      }

      console.log(data);
       toast.error("خطا در دریافت لیست کاربران برای خروجی")
    })

  } ,[])
  
  useEffect(() => {
    setLoading(true)
    getUsers((pagination.current*pagination.pageSize) - pagination.pageSize ,pagination.pageSize ,(isOk ,data) => {
      if(isOk){
        console.log(data.response.users);

        setLoading(false)
        setPagination({
          ...pagination,
          total:10000
        })
        return setUsers(data.response.users)
      }
      setLoading(false)
      console.log(data);
       toast.error("خطا در دریافت لیست کاربران")
    })

  } ,[pagination.current ,pagination.pageSize])

  useEffect(() => {
    getPlansForAdmin((isOk ,data) => {
      if(isOk){
        console.log(data);
        return setListOfPlans(data.response.plans)
      }
      return console.log(data);
    })
  },[])



  const handleTableChange = (e) => {
    console.log(e);
    setPagination({
      ...pagination,
      ['pageSize']:e.pageSize,
      ['current']:e.current
    })
  }


  const ExpandedRowRender = record => {

      return(
        <div style={{width:"100%" ,minHeight:"100px" ,display:"flex" ,flexDirection:"column" ,alignItems:"flex-end"}} >
          {
            record.plans.map((item,index) => {
              const eachplan = listOfPlans.find((plan ) => plan._id === item.planId )
              return(
                <div key={item._id}>
                  
                  <p > {eachplan.name}  </p>
                 
                </div>
              )
            })
          }
        </div>
      )

}
  
  const menu = (e) => {
   
      return(
      <Menu>
        <Menu.Item key={e.key}> 
          <UserModal transactions={e.transactions} allPlans = {listOfPlans} />
        </Menu.Item>
      </Menu>
    
      )
    }

  const columns = [

    { title: 'عملیات', key: 'operation', align:"right", render: (e) => {
      return(
      <Space size="middle">
        <Dropdown overlay={menu(e)} trigger={['click']}>
          <a className={styles.link} >
           <DownOutlined /> بیشتر
          </a>
        </Dropdown>
      </Space>
      )
    }
    },
    { title: 'جمع پرداختی‌ها', dataIndex: 'payment', key: 'payment' ,align:"right" ,   sorter: {
      compare: (a, b) => a.payment - b.payment,
      multiple: 3,
    },  },
    { title: 'شماره‌تماس', dataIndex: 'mobileNumber', key: 'PhoneNumber' ,align:"right" ,   sorter: {
      compare: (a, b) => a.mobileNumber - b.mobileNumber,
    }, },
    { title: 'ایمیل', dataIndex: 'email', key: 'FirstName',className:"headerOfTable" ,align:"right",sorter: {
      compare: (a, b) => a.email - b.email,
    }, },
    { title: 'نام‌خانوادگی', dataIndex: 'family', key: 'LastName' ,align:"right" ,sorter: {
      compare: (a, b) => a.family && a.family.localeCompare(b.family) ,
    },  },
    { title: 'نام', dataIndex: 'name', key: 'FirstName',className:"headerOfTable" ,align:"right",sorter: {
      compare: (a, b) => a.name && a.name.localeCompare(b.name) ,
    }, },
  ];

  const data = []
  
  for (let i = 0; i < users.length; ++i) {
    const pay = users[i].transactions && users[i].transactions.reduce((accu ,item) => {
      if(item.amount){    
        return accu + +item.amount
      }
      return accu
    } ,0)
  
    data.push({
      key: i,
      name: users[i].name,
      family: users[i].family,
      mobileNumber: users[i].mobileNumber,
      email:users[i].email,
      payment:numberWithCommas(pay),
      plans:users[i].plans,
      transactions:users[i].transactions
    });
  }

  return (
    <>
    <Table
      className="components-table-demo-nested"
      columns={columns}
      dataSource={data}
      direction={"rtl"}
      style={{width:"100%"}}
      pagination={pagination}
      loading={loading}
      onChange = {handleTableChange}
      scroll = {{y:500}}
      onExpand={(isExpanded, record) =>
        setExpandedRow(isExpanded ? record.key : undefined)
      }
      expandedRowRender={ExpandedRowRender}
      expandedRowKeys={[expandedRow]}
      />
      <ReportsExport csvData={usersExport} fileName={"کاربران"} />
      </>
  );
}



const Users = () => {

    return ( 
       <NestedTable  />
     );
}
 
export default Users;