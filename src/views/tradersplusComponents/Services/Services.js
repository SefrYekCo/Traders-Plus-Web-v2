import React, { useEffect, useState  } from 'react';
import { Button, Card } from 'react-bootstrap';

import noImage from "../../../images/no-image-icon-23485 (1).png"
import { Link } from 'react-router-dom';
import {EyeOutlined} from "@ant-design/icons"

import { getServices } from 'src/api/serviceApi';

import styles from "./services.module.css";

const Services = () => {

    const [services ,setServices] = useState([])
    const [isEmpty ,setIsEmpty] = useState(false)
    const [search ,setSearch] = useState('')

    
    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        
        getServices((isOk ,data) => {
         if(isOk){
             console.log(data.response.services);
             data.response.services.sort((a,b) => {
                const x = new Date(a.createdAt)
                const y = new Date(b.createdAt)
                if(x > y){return -1}
                if(x > y){return 1}
                return 0
              })
             setIsEmpty(true)
             return setServices(data.response.services)
         }   
         setIsEmpty(true)
         return console.log(data);
        })
    } ,[])

    const filterServices = services.filter((item) => item.name.toLowerCase().includes(search))

    return ( 
        <>
            <input type="text" name="search" placeholder='جستجو بر اساس نام' value={search} onChange={searchHandler} className={styles.searchInput} />
        <div className='d-flex flex-wrap justify-content-around align-items-center mb-3'>


            { 
            services.length === 0 && isEmpty ?

            <h1 style={{marginTop:'1rem'}}>داده ای یافت نشد</h1>
            :
            filterServices.map((item) => {
                return(
                <Card key={item._id} style={ item.isActive ? { width: '18rem' ,height:"25rem" ,marginTop:'1rem'} : { width: '18rem' ,height:"25rem" ,backgroundColor:'#ccc' ,marginTop:'1rem'} }>
                
                    <Card.Img variant="top" alt='photo' src={item.icon ? item.icon :noImage } className="h-50 p-3" />
                    
                    <Card.Body style={{height:"50%" ,display:"flex" ,flexDirection:"column" ,justifyContent:"flex-start" ,alignItems:"flex-end" }} >
                    <Card.Title style={{height:"30%",textAlign:"right"}}> {item.name} </Card.Title>
                        <Card.Text style={{height:"30%" ,textAlign:"right" ,overflow:"hidden"}}>
                            {item.description}
                        </Card.Text>
                        <div className='d-flex justify-content-between w-100'>
                  
                    <Link style={{color:"#ffffff" ,textDecoration:"none" ,height:"20%"}} to={`/service/${item._id}`}> <Button  variant="primary">  بیشتر  </Button></Link> 
                        </div>
                    </Card.Body>
                </Card>
                )
            })
            }
        </div>
        </>
     );
}
 
export default Services;