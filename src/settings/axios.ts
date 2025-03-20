/**
 * file: axios.ts
 * description: Responsible for custom axios
 * date: 04/04/2024
 * authors: Vicente Borges & Yuri Shikabala
 */
import axios from "axios"

export const AxiosHttpClient = axios.create({
    baseURL: process.env.BASE_SERVER+"/api"
})

AxiosHttpClient.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

AxiosHttpClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
