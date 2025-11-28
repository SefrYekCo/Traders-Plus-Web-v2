/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import styles from './usersPlansModal.module.css'


import { useDispatch ,useSelector } from 'react-redux';

const UserModal = ({transactions ,allPlans}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
       تراکنش ها
      </Button>
      <Modal centered  bodyStyle={{overflow:"auto" ,height:"500px"}} zIndex={1200} title="تراکنش ها"  visible={isModalVisible} okText="بستن" onCancel={handleCancel} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}  >
        
              <table className={styles.table}>
                <thead>

                <tr>
                  <th>نام پلن</th>
                  <th>مبلغ پلن</th>
                  <th>مدت زمان پلن</th>
                </tr>
                </thead>
            {
              transactions.map((item) => {
                const eachplan = allPlans.find((plan) => plan._id === item.plan )
                  return(
                    <tbody key={item._id}>
                    <tr >
                      <td>{eachplan.name} </td>
                      <td>{item.amount} </td>
                      <td>{item.period} </td>
                    </tr>
                    </tbody>
                        )
                      })
                    }
               </table>
            
      </Modal>
    </>
  );
};

export default UserModal;