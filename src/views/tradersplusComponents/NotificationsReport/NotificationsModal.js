/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import styles from './notificationsModal.module.css';

const NotificationsModal = ({wrongs ,corrects}) => {

    console.log(wrongs);
    console.log(corrects);

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
        بیشتر
      </Button>
      <Modal centered  bodyStyle={{overflow:"auto" ,height:"500px" ,display:"flex" ,justifyContent:"space-around"}} zIndex={1200} title="تراکنش ها"  visible={isModalVisible} okText="بستن" onCancel={handleCancel} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}  >
        
            <div className={styles.correctsContainer}>
                <p> ارسال های موفق </p>
                {
                    corrects.map((item) =>{
                        return(
                            <p key={item}> {item} </p>
                        )
                    })
                }
            </div>
            <div className={styles.correctsContainer}>
            <p> ارسال های ناموفق </p>
                {
                    wrongs.map((item) =>{
                        return(
                            <p key={item}> {item} </p>
                        )
                    })
                }
            </div>
            
      </Modal>
    </>
  );
};

export default NotificationsModal;