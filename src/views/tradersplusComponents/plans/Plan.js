/* eslint-disable react/prop-types */
import React, { useState ,useEffect } from 'react';
import { Button, Card ,Tooltip} from 'antd';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editPlanType, getPlans } from 'src/api/plansApi';
import styles from "./plan.module.css";
import { numberWithCommas } from 'src/helpers/helperFunctions';

import { useSelector ,useDispatch } from 'react-redux';
import PlanModal from './PlanModal';
import TypeModal from './TypeModal';

const { Meta } = Card;

const Plan = () => {

    // const dispatch = useDispatch()
    // const [isModalVisible, setIsModalVisible] = useState(false);

    const [plan ,setPlan] = useState({})
    const [update ,setUpdate] = useState(false)
    const location = useLocation()
    const id = location.pathname.split("/")[2]

    useEffect(() => {
        getPlans((isOk ,data) => {
            if(isOk){
       
                const plan = data.response.plans.find((item) => item._id === id)
                console.log(plan);
                if(!plan){
                    return toast.error("پلن مورد نظر یافت نشد")
                }
                return setPlan(plan)
            }
            else{
                toast.error('خطا در دریافت پلن ')
                return console.log(data);
            }
        })
    } ,[update])

    const removeHtmlTag = () => {
        if(plan.description){
            return plan.description.replace(/(<([^>]+)>)/gi, "");
        }
    }

    // const typeModalHandler = () => {
    //     setIsModalVisible(true)
    // }
    
    return(
        <div className={styles.mainContainer}>
        <Card  className={styles.card} title={plan.name}  headStyle={{fontSize:"30px"}} bordered={false} >
         
          <p> {removeHtmlTag()} </p>
              <h4> انواع پلن</h4>
          <div className={styles.typesContainer}>
          {
              plan.types &&
              plan.types.map((item) => {
                  return(
                <div className={styles.Container} key={item._id}>
                    <Card
                    // onClick={typeModalHandler}
                    hoverable
                    className={styles.typeCard}
                    style={ item.isActive ? { width: "max-content" ,margin:"0 10px" } : { width: "max-content" ,margin:"0 10px", backgroundColor:"#ccc"}}
                    >
                        <h5> {` مبلغ : ${ numberWithCommas(item.amount)} ریال`} </h5>
                        <p> {` مدت زمان اعتبار: ${item.period} روز`}</p>
                        <p> {item.discount}:تخفیف</p>
                    </Card>
                    <TypeModal id={plan._id} typeId={item._id} setUpdate = {setUpdate} planData={item} />
                </div >
                  ) 
              })
          }
          </div>
   
        </Card>
          <PlanModal id={plan._id} setUpdate = {setUpdate} description={removeHtmlTag()} name = {plan.name}  />
      </div>
    )
}

export default Plan