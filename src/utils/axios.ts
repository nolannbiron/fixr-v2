import { getAccessToken } from './localStorage'
import { default as axiosBase } from 'axios'

const protocol = import.meta.env.PROD ? 'https' : 'http'
const serveUrl = `${protocol}://${import.meta.env.VITE_API_BASE_URL}/v1`
console.log(serveUrl)
const axios = axiosBase.create({
    baseURL: serveUrl,
    withCredentials: true,
})

axios.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken()
        if (accessToken) {
            config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

export default axios
