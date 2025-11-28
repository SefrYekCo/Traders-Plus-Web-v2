import React, { useEffect, useState } from 'react';

import { Table, Badge, Menu, Dropdown, Space ,Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import moment from "jalali-moment"
import { isoDateWithoutTimeToJalaliDate, numberWithCommas } from 'src/helpers/helperFunctions';

import { toast } from 'react-toastify';

import styles from "./notificationsReport.module.css";

import { getNotifications } from 'src/api/NotificationApi';
import NotificationsModal from './NotificationsModal';

import { ReportsExport } from '../export/Export';

function NestedTable() {

  const [notifications ,setNotifications] = useState([])
  const [expandedRow, setExpandedRow] = useState(0);

  const [pagination ,setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions:[5 ,10 ,15]
  })
  
  useEffect(() => {
   
    getNotifications((isOk ,data) => {
      if(isOk){
        console.log(data);
     
        return setNotifications(data.response.reports)
      }
   
      console.log(data);
       toast.error("خطا در دریافت لیست پیام ها")
    })

  } ,[])

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
        
                <div key={record.key} style={{textAlign:'right'}}>
                  
                  <p > {record.message}  </p>
                 
                </div>
       
        </div>
      )

}
  
  const menu = (e) => {
   
      return(
      <Menu>
        <Menu.Item key={e.key}> 
          <NotificationsModal corrects={e.corrects} wrongs={e.wrongs} />
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
    { title: ' تاریخ ایجاد', dataIndex: 'createdAt', key: 'payment' ,align:"right" ,   sorter: {
            compare: (a, b) => moment(a.createdAt).diff(b.createdAt ,"millisecondk") ,
            multiple: 3,
        },  
    },

    { title: 'عنوان', dataIndex: 'title', key: 'FirstName',className:"headerOfTable" ,align:"right",sorter: {
      compare: (a, b) => a.title && a.title.localeCompare(b.title) ,
    }, },
  ];

  const data = []
  
  for (let i = 0; i < notifications.length; ++i) {
  
    data.push({
      key: i,
      title: notifications[i].title,
      createdAt:isoDateWithoutTimeToJalaliDate(notifications[i].createdAt),
      corrects:notifications[i].corrects,
      wrongs:notifications[i].wrongs,
      message:notifications[i].message
    });
  }

  return (
    <>
    <Table
      className="components-table-demo-nested"
      columns={columns}
      dataSource={data}
      direction={"rtl"}
      style={{width:"100%" ,height:"90%"}}
      onChange={handleTableChange}
      onExpand={(isExpanded, record) =>
        setExpandedRow(isExpanded ? record.key : undefined)
      }
      expandedRowRender={ExpandedRowRender}
      expandedRowKeys={[expandedRow]}
      pagination={pagination}
      />
       <ReportsExport csvData={notifications} fileName={"لیست اعلان ها"} />
      </>
  );
}



const NotificationsReport = () => {

    return ( 
     
       <NestedTable  />
      
    
     );
}
 
export default NotificationsReport;