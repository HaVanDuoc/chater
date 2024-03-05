import api from "~/config/api.config"

namespace API {
    export const getSuggestFriends = async () => {
        try {
            const response = await api.get("/user/friend/suggest")
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default API
