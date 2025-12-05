import axios from "axios";

const baseURL = process.env.REACT_APP_MODE === "production" ? 'https://apinew.traderzplus.ir/api/v1' : 'http://tradersplus-qa.sefryek.com:5000/api/v1'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQxOTIwNzMxMjg3ZTUyZWFlZDNiOWMiLCJtb2JpbGVOdW1iZXIiOiIwOTM2NzIzMTMzNyIsImlzcyI6InRyYWRlcnNwbHVzIiwiZXhwIjoxMjAwMDAwMDAwMDAwLCJpYXQiOjE2NDcyMTE5ODB9.mT7iXSLt0_sTcZCFDYz_koYtDu26ddnbNDt_aKkMQAM" 

const prodToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY5MzAwZDU3Zjg0YWRhNTEzMDFiMTAiLCJtb2JpbGVOdW1iZXIiOiIwOTM2NzIzMTMzNyIsImlzcyI6InRyYWRlcnNwbHVzIiwiZXhwIjoxMjAwMDAwMDAwMDAwLCJpYXQiOjE2MzA3NDIyOTF9.W9VwL8GUS0LGviVkMWXq2akd1jj3nEvBlA8utgWLygk"

const mainToken = process.env.REACT_APP_MODE === "production" ? prodToken : token

export const api = () => {
    return axios.create({
        baseURL
    })
}

export const apiWithHeader = () =>{
    return axios.create({
        baseURL,
        headers:{
            Authorization:`Bearer ${mainToken}`
        }
    })
}

export const apiWithTokenHeader = () =>{
    return axios.create({
        baseURL,
        headers:{
            token:mainToken
        }
    })
}

export const apiWithMoreHeader = () =>{
    return axios.create({
        baseURL,
        headers:{
            Authorization:`Bearer ${mainToken}`,
            Cache:"no-cache",
            
        }
    })
}

export const apiWithPasswordHeader = () =>{
    return axios.create({
        baseURL,
        headers:{
            Password:"sefryek3914!@#$"
        }
    })
}

export const apiWithPassworAndTokendHeader = () =>{
    return axios.create({
        baseURL,
        headers:{
            Password:"sefryek3914!@#$",
            token:mainToken
        }
    })
}