import React, { useEffect, useState ,useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getBanners } from 'src/api/bannersApi';
import noImage from "../../../images/no-image-icon-23485 (1).png"
import { Link } from 'react-router-dom';
import {EyeOutlined} from "@ant-design/icons"
import {bennersContext} from "../../../context/bannersContext"
import BannersContextProvider from 'src/context/bannersContext';
import { Pagination } from 'antd';
import styles from './banners.module.css';

const Banners = () => {

    // const banners = useContext(bennersContext)

    const [banners ,setBanners] = useState([])
    const [isEmpty ,setIsEmpty] = useState(false)
    const [search ,setSearch] = useState('')

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }


    
    useEffect(() => {
        
        getBanners((isOk ,data) => {
         if(isOk){
             console.log(data.response.banners);
             data.response.banners.sort((a,b) => {
                const x = new Date(a.createdAt)
                const y = new Date(b.createdAt)
                if(x > y){return -1}
                if(x > y){return 1}
                return 0
              })
             setIsEmpty(false)
            return setBanners(data.response.banners)
         }   
         setIsEmpty(true)
         return console.log(data);
        })
    } ,[])


    const filterBanners = banners.filter((item) => item.name.toLowerCase().includes(search))


    return ( 
        <div className={styles.mainContainer}>
             <input type="text" name="search" placeholder='جستجو بر اساس نام' value={search} onChange={searchHandler} className={styles.searchInput} />
        <div className='d-flex flex-wrap justify-content-around align-items-center'>
            { 
            banners.length === 0 && isEmpty ?

            <h1>داده ای یافت نشد</h1>
            :
            filterBanners.map((item) => {
               
                    return(
                    <Card key={item._id} style={ item.isActive ? { width: '18rem' ,height:"25rem" ,marginTop:'1rem'} : { width: '18rem' ,height:"25rem" ,backgroundColor:'#ccc' ,marginTop:'1rem'} }>
                        {
                            item.resources.icon && item.resources.icon.split(".")[1] === "mp4" ?
                            <video className='h-50' controls muted autoPlay >
                                <source src={item.resources.icon ? item.resources.icon : noImage} type="" />
                            </video>
                            :
                            <Card.Img  variant="top" alt='photo' src={item.resources.icon ? item.resources.icon : noImage } className="h-50" />
                        }
                        <Card.Body style={{height:"50%" ,display:"flex" ,flexDirection:"column" ,justifyContent:"flex-start" ,alignItems:"flex-end" }} >
                        <Card.Title style={{height:"30%",textAlign:"right" ,overflow:"hidden"}}> {item.name} </Card.Title>
                            <Card.Text style={{height:"30%" ,textAlign:"right" ,overflow:"hidden" ,width:"100%"}}>
                                {item.description}
                            </Card.Text>
                        
                            <div className='d-flex justify-content-between w-100'>
                           <div>
                                <span className={styles.platform} >{item.platform} </span>
                            </div> 
                        <Link style={{color:"#ffffff" ,textDecoration:"none" ,height:"20%"}} to={`/banner/${item._id}`}>  <Button  variant="primary"> بیشتر </Button>  </Link> 
                            </div>
                        </Card.Body>
                    </Card>
                    )
                })
            }
        </div>
            {/* <Pagination defaultCurrent={1} total={banners.length} onChange={pageHandler}  /> */}
        </div>
     );
}
 
export default Banners;
