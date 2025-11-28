/* eslint-disable react/prop-types */

import React ,{ useEffect , createContext , useState } from "react";

//*API
import { getBanners } from "../api/bannersApi"

export const bennersContext = createContext();

const BannersContextProvider = ({children}) => {

    const [banners , setBanners] = useState([]);

// useEffect(() => {
//     const fetchApi = () => {
//          getBanners((isOk ,data) => {
//             if(isOk){
//                 console.log(data);
//                 return setBanners(data.response.banners)
//             }
//             console.log(data);
//         });
        
//     }

//     fetchApi();
    
// }, [])    


    return (
        <bennersContext.Provider value={banners} >
            {children}
        </bennersContext.Provider>
      );
}
 
export default BannersContextProvider ;