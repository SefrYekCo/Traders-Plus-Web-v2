import { api , apiWithHeader, apiWithPassworAndTokendHeader, apiWithPasswordHeader, apiWithTokenHeader } from "./api";

export const getMessages = (id ,callback) => {
    apiWithPasswordHeader().get(`/message/messages/${id}`).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,response)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const sendMessage = (data ,callback) => {
    apiWithTokenHeader().post("/message/send" ,data).then((response) => {
        const data = response.data;
        console.log(response);
        return callback(true ,response)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getMessageV2 = (channelId, page ,callback) => {
    apiWithPassworAndTokendHeader().get(`/message/messagesv2?page=${page}&channelId=${channelId}`).then((response) => {
            const data = response.data
            console.log(response);
            return callback(true,data)
        }).catch(err =>{
        console.log(err);
        return callback(false ,err)
    })
}

export const deleteMessage = (data  ,callback) => {
    apiWithPassworAndTokendHeader().post("/message/delete-message" ,data).then((response) => {
            const data = response
            console.log(response);
            return callback(true ,response)
        }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const editMessage = (data ,callback) => {
    apiWithPassworAndTokendHeader().post("/message/edit-message" ,data).then((response) => {
            const data = response.data
            console.log(data);
            return callback(true ,data)
        }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}