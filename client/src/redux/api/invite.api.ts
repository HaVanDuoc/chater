import api from "~/config/api.config"

namespace API {
    export const getInvite = async () => {
        try {
            const response = await api.get("/invite")
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }
}

export default API
