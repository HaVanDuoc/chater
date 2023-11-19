import axios from "axios"

const token = localStorage.getItem("token") || ""

export const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_HOST,
    timeout: 60000,
    headers: { authorization: `Bearer ${token}` },
})

export default instance
