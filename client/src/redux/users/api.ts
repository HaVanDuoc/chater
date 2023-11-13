import axios from "axios"
import { IUser } from "./interfaces"

export const getUserData = async (userId: IUser["id"]) => {
    try {
        const response = await axios.get(`/api/v1/users/${userId}`)
        return response.data
    } catch (error) {
        throw new Error("Failed to fetch user data")
    }
}
