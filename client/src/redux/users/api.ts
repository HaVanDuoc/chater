import instance from "~/utils/instanceAxios"

namespace Api {
    export const login = async (access_token: string) => {
        try {
            const response = await instance.post(`/auth/login`, {
                access_token,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string) => {
        try {
            const response = await instance.post(`/user/search`, {
                key,
            })
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default Api
