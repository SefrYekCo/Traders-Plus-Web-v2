import {api ,apiWithHeader, apiWithTokenHeader } from "./api"

export const getCategories = (callback) => {
    api().get("/category/getAll").then((response) => {
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

export const createCategory = (data ,callback) => {
    api().post("/category/add" ,data).then((response) => {
        const data = response
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

export const activateCategory = (data ,callback) => {
    apiWithTokenHeader().post("/category/activation" ,data).then((response) => {
        const data = response
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

export const editCategory = (data ,callback) => {
    api().post("/category/edit" ,data).then((response) => {
        const data = response
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
