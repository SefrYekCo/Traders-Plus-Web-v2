/* eslint-disable react/prop-types */

import React ,{ useEffect , createContext , useState } from "react";

//*API
import { getChannels } from "../api/channelAPI"

export const channelContext = createContext();

const ChannelsContextProvider = ({children}) => {

    const [channels , setChannels] = useState([]);

// useEffect(() => {
//     const fetchApi = () => {
//          getChannels((isOk ,data) => {
//             if(isOk){
//                 console.log(data);
//                 return setChannels(data.response.channels)
//             }
//             console.log(data);
//         });
        
//     }

//     fetchApi();
    
// }, [])    


    return (
        <channelContext.Provider value={channels} >
            {children}
        </channelContext.Provider>
      );
}
 
export default ChannelsContextProvider ;