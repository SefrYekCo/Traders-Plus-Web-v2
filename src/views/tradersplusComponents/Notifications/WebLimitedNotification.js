import { Button, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";

import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getWebTokensNotification,
  sendLimitedWebNotification,
} from "src/api/NotificationApi";

import styles from "./webLimitedNotification.module.css";

const WebNotification = () => {
  const { Option } = Select;

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [notificationData, setNotificationData] = useState({
    title: "",
    body: "",
  });

  const [notificationResult, setNotificationResult] = useState({
    success: 0,
    failure: 0,
  });

  const [selectedTokens, setSelectedTokens] = useState([]);

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    getWebTokensNotification((isOk, info) => {
      if (isOk) {
        console.log(info);
        return setSelectedTokens(info.users);
      }
      return toast.error("خطا در دریافت اطلاعات");
    });
  }, []);

  const changeHandler = (e) => {
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    const data = {
      tokens: [...selectedItems],
      title: notificationData.title,
      body: notificationData.body,
    };
    sendLimitedWebNotification(data, (isOk, info) => {
      if (isOk) {
        setNotificationResult({
          success: info.response.success,
          failure: info.response.failure,
        });
        return setShowResult(true);
      }
      return toast.error("خطا در ارسال اعلان");
    });
  };

  const filteredOptions = selectedTokens.filter(
    (o) => !selectedItems.includes(o)
  );

  return (
    <Form onSubmit={submitHandler} className={styles.formContainer}>
      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
        <Select
          mode="multiple"
          placeholder="انتخاب کاربر"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: "100%",
            margin:"1rem 0",
            textAlign:"right"
          }}
          options={filteredOptions.map((item) => ({
            value: item.web_notification_token,
            label: item.mobileNumber,
          }))}
        />
        <Form.Control
          onChange={changeHandler}
          value={notificationData.title}
          type="text"
          name="title"
          dir="rtl"
          placeholder="نام پیام"
          className="w-100"
        />
      </Form.Group>
      <Form.Group
        className="mb-3 w-100"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Control
          onChange={changeHandler}
          value={notificationData.body}
          as="textarea"
          name="body"
          dir="rtl"
          placeholder="متن پیام"
          className="w-100"
          rows={3}
          style={{ resize: "none" }}
        />
      </Form.Group>

      <div className="col-md-2 w-100 d-flex justify-content-end mt-3 ">
        <Button
          type="primary"
          loading={loadingBtn}
          onClick={submitHandler}
          className="mb-2"
        >
          ارسال پیام
        </Button>
      </div>
      {showResult && (
        <div className={styles.showResultContainer}>
          <p> ارسال موفق : {notificationResult.success} </p>
          <p> ارسال ناموفق : {notificationResult.failure} </p>
        </div>
      )}
    </Form>
  );
};

export default WebNotification;
