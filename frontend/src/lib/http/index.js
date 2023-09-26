import axios from "axios"
import { PUBLIC_SERVER_API_URL } from '$env/static/public';

const host = axios.create({
    baseURL: PUBLIC_SERVER_API_URL
})

const authHost = axios.create({
    baseURL: PUBLIC_SERVER_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token')
    return config
}

authHost.interceptors.request.use(authInterceptor)

export {
    host,
    authHost
}