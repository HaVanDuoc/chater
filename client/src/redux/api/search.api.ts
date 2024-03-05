import api from "~/config/api.config"
import { ISearch } from "../interface/search.interface"

namespace API {
    export const search = async (key: ISearch["key"]) => {
        try {
            const response = await api.get(`/search/${key}`)
            return response.data
        } catch (error) {
            throw new Error("API fetchMessage error!")
        }
    }
}

export default API
