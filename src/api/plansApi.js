import { apiWithHeader ,api } from "./api";

export const getPlans = (callback) => {
    api().get("/plan/getAll-admin").then((response) => {
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

export const getPlansForAdmin = (callback) => {
    api().get("/plan/getAll-admin").then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const createPlan = (data ,callback) => {
    api().post("/plan/add" ,data).then((response) => {
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const editPlan = (data ,callback) => {
    api().post("/plan/edit" ,data).then((response) =>{
        const data = response
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}


export const editPlanType = (data ,callback) => {
    api().post("/plan/edit-type" ,data).then((response) =>{
        const data = response.data
        const status = response.status
        if(status){
            return callback(true , data)
        }
        return callback(false ,data)
    }).catch(err => {
        console.log(err);
        return callback(false ,err)
    })


}