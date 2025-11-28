import React, { useEffect, useState } from 'react';
import { Skeleton, Card } from 'antd';
import { EditOutlined, EllipsisOutlined ,DeleteOutlined ,EyeFilled, EyeInvisibleFilled ,CloseOutlined ,CheckOutlined} from '@ant-design/icons';
import { editPlan, getPlans } from 'src/api/plansApi';

import styles from "./plans.module.css"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Meta } = Card;

const Plans = () => {
    
    const [plans ,setPlans] = useState([])
    const [loading ,setLoading] = useState(true)
    const [search ,setSearch] = useState("")
    const [update ,setUpdate] = useState(false)


    useEffect(() => {
        getPlans((isOk ,data) => {
            if(isOk){
                console.log(data.response);
                setPlans(data.response.plans)
                return setLoading(false)
            }
            else{
                return console.log(data);
            }
        })
    } ,[update])

    const deActivationHandler = (isActive ,id) => {
      
        const data = {
            id: id,
            isActive:!isActive,
            password:"sefryek3914!@#$"
        }
       
        editPlan(data ,(isOk ,info) => {
            if(isOk){
                
                setUpdate(perv => !perv)
                return 
            }
            console.log(info);
            return toast.error("خطا در حذف پلن")
        })
    }

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const filterPlans = plans.filter((item) => item.name.toLowerCase().includes(search))
  
    return (
        <div className={styles.container}>
            
          <input type="text" name="search" placeholder='جستجو بر اساس نام' value={search} onChange={searchHandler} className={styles.searchInput} />
        
      <div className={styles.mainContainer}>
          {
              
              filterPlans.sort((a ,b) =>  Number(b.isActive) - Number(a.isActive)).map((item) => {
                let strippedString = item.description.replace(/(<([^>]+)>)/gi, "");
                  return(
                    <Card
                    key={item._id}
                    hoverable
                    style={ item.isActive ? { width: 300, marginTop: 16  } :{ width: 300, marginTop: 16 , backgroundColor:"#ccc" }  }
                    actions={[
                             <button key="elipsis" className={styles.btn}  onClick={ () => deActivationHandler(item.isActive ,item._id)} type="button">{ item.isActive ? <CloseOutlined /> : <CheckOutlined /> }</button> ,
                            <Link key="edit" to={`/plan/${item._id}`} className={styles.linkTag}> <EditOutlined  /></Link> ,
                            ]}
                    >
                        <Skeleton loading={loading} active >
                            <Meta
                            title={item.name}
                            description={strippedString}
                            style={{textAlign:"right" ,minHeight:"180px"}}
                            />
                        </Skeleton>
                    </Card>
                  )
              })
          }
      </div>
      </div>
    );
}

export default Plans;