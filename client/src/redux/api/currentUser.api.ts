import api from "~/config/api.config"

namespace API {
    export const checkSession = async () => {
        try {
            const response = await api.get("/auth/session")
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default API
