/**
 * file: axios.ts
 * description: Responsible for custom axios
 * date: 04/04/2024
 * authors: Vicente Borges & Yuri Shikabala
 */
import Axios from 'axios'

export const AxiosHttpClient = Axios.create({
    baseURL: process.env.BASE_SERVER_API
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
