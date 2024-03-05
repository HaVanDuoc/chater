import api from "~/config/api.config"

namespace API {
    export const getListFriends = async () => {
        try {
            const response = await api.get("/user/friend/list")
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default API
