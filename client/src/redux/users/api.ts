import axios from "axios"

namespace Api {
    export const login = async (access_token: string) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                access_token,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/user/search`, {
                key,
            })
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default Api
