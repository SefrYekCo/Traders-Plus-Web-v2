import {api ,apiWithHeader, apiWithPasswordHeader } from "./api";

export const createBrokerage = ( data ,callback) => {
    apiWithPasswordHeader().post("/brokerage/create" ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getBrokerages = (callback) => {
    apiWithPasswordHeader().get("/brokerage/all").then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getBrokerage = (id ,callback) => {
    apiWithPasswordHeader().get(`/brokerage/${id}`).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const editBrokerage = (id ,data ,callback) => {
    apiWithPasswordHeader().patch(`/brokerage/edit/${id}` ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const changeBrokerIndex = (data ,callback) => {
    apiWithPasswordHeader().post(`/brokerage/index` ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true ,data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}