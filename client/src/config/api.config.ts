import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "*"

export const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    timeout: 0,
    withCredentials: true,
})

export default api
