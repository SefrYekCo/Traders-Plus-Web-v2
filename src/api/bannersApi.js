import {api ,apiWithHeader, apiWithPasswordHeader } from "./api"

export const getBanners = (callback) => {
    apiWithPasswordHeader().get("/banner/getAll-admin").then((response) => {
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

export const getBanner = (id ,callback) => {
    apiWithPasswordHeader().get(`/banner/${id}`).then((response) => {
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

export const createBanner = (data ,callback) => {
    api().post(`/banner/add` ,data).then((response) => {
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

export const editBanner = (data ,callback) => {
    apiWithPasswordHeader().post(`/banner/edit` ,data).then((response) => {
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