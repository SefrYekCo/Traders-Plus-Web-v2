import { api , apiWithHeader, apiWithPasswordHeader } from "./api";

export const enableNotification = (data ,callback) => {
    api().post(`/enable-notif` ,data).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,response)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getNotifications = (callback) => {
    api().get(`/admin/notification-report` ).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,data)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const getWebTokensNotification = (callback) => {
    apiWithPasswordHeader().get(`/admin/get-notification-token` ).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,data)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const sendWebNotification = (data ,callback) => {
    apiWithPasswordHeader().post(`/admin/send-web-notification` ,data).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,data)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}

export const sendLimitedWebNotification = (data ,callback) => {
    apiWithPasswordHeader().post(`/admin/send-limited-web-notification` ,data).then((response) => {
        const data = response.data
        console.log(response);
        return callback(true ,data)
        }
    ).catch(err => {
        console.log(err);
        return callback(false ,err)
    })
}