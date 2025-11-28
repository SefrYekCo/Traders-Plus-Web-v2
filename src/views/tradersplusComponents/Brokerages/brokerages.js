import React, { useEffect, useState  } from 'react';
import { Button, Card } from 'react-bootstrap';

import noImage from "../../../images/no-image-icon-23485 (1).png"
import { Link } from 'react-router-dom';

import styles from "./brokerages.module.css";
import { getBrokerages } from 'src/api/brokerageApi';

const Brokerages = () => {

    const [brokerages ,setBrokerages] = useState([])
    const [isEmpty ,setIsEmpty] = useState(false)
    const [search ,setSearch] = useState('')

    
    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        
        getBrokerages((isOk ,data) => {
         if(isOk){
             console.log(data.response.response);
             data.response.response.sort((a,b) => {
                const x = new Date(a.index)
                const y = new Date(b.index)
                if(x > y){return -1}
                if(x > y){return 1} 
                return 0
              })
             setIsEmpty(true)
             return setBrokerages(data.response.response)
         }   
         setIsEmpty(true)
         return console.log(data);
        })
    } ,[])

    const filterServices = brokerages.filter((item) => item.name.toLowerCase().includes(search))

    return ( 
        <>
            <input type="text" name="search" placeholder='جستجو بر اساس نام' value={search} onChange={searchHandler} className={styles.searchInput} />
        <div className='d-flex flex-wrap justify-content-around align-items-center mb-3'>


            { 
            brokerages.length === 0 && isEmpty ?

            <h1 style={{marginTop:'1rem'}}>داده ای یافت نشد</h1>
            :
            filterServices.map((item) => {
                return(
                <Card key={item.id} style={ item.isActive ? { width: '18rem' ,height:"25rem" ,marginTop:'1rem'} : { width: '18rem' ,height:"25rem" ,backgroundColor:'#ccc' ,marginTop:'1rem'} }>
                
                    <Card.Img variant="top" alt='photo' src={item.imageURL ? item.imageURL :noImage } className="h-50 p-3" />
                    
                    <Card.Body style={{height:"50%" ,display:"flex" ,flexDirection:"column" ,justifyContent:"flex-start" ,alignItems:"flex-end" }} >
                    <Card.Title style={{height:"30%",textAlign:"right"}}> {item.name} </Card.Title>
                        <Card.Text style={{height:"30%" ,textAlign:"right" ,overflow:"hidden"}}>
                          <a href={item.webAddress} target='_blank' rel='noreferrer' > ورود </a> 
                        </Card.Text>
                        <div className='d-flex justify-content-between w-100'>
                  
                    <Link style={{color:"#ffffff" ,textDecoration:"none" ,height:"20%"}} to={`/brokerages/${item.id}`}> <Button  variant="primary">  بیشتر  </Button></Link> 
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
 
export default Brokerages;