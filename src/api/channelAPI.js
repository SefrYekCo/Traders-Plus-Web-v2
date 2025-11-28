import { api , apiWithHeader, apiWithTokenHeader } from "./api";

export const getChannels = (callback) => {
    apiWithHeader().get("/channel/getAll").then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getChannelsForAdmin = (callback) => {
    apiWithTokenHeader().get("/channel/getForAdmin").then((response) => {
        const data = response.data
        console.log(data);
        if(data.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const createChannel = (data ,callback) => {
    api().post("/channel/add" ,data).then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const activateChannel = (data ,callback) => {
    api().post("/channel/activation" ,data).then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}

export const muteChannel = (data ,callback) => {
    apiWithHeader().post("/channel/mute" ,data).then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,response)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}


export const editChannel = (data ,callback) => {
    api().post("/channel/edit" ,data).then((response) => {
        const data = response.data
        console.log(data);
        if(response.status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch((err) => {
        console.log(err);
        return callback(false ,err)
    })
}