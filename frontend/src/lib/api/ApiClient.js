import axios from "axios"
import { config } from "dotenv"
import useAuthStore from "../stores/authStore"






const api_url='srv-da09gdm7bikc73em6v7g/api'

const Api=axios.create({
    baseURL:api_url,
    headers:{
        'Content-type':'application/json'
    }
})

//interceptor to add  the authorization header

Api.interceptors.request.use((config)=>{
    const token= useAuthStore.getState().token;

    if(token){
        config.headers.Authorization=`bearer ${token}`
    }
    return config;
})

export default Api