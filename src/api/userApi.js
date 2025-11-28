import { apiWithTokenHeader ,apiWithPasswordHeader ,api } from "./api";

export const getUsers = ( skip ,limit ,callback) => {
    apiWithPasswordHeader().get(`/admin/users-report?skip=${skip}&limit=${limit}`).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,response)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getUserByPhoneNumber = ( phoneNumber ,callback) => {
    apiWithTokenHeader().get(`/user/getUserByPhoneNumber/${phoneNumber}`).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,response)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}