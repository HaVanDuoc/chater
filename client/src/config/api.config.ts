import axios from "axios"

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    timeout: 0,
    // headers: { authorization: `Bearer ${token}` },
    withCredentials: true,
})

export default api
