import api from "~/config/api.config"
import { ISearch } from "./interfaces"

namespace Api {
    export const search = async (key: ISearch["key"]) => {
        try {
            const response = await api.post(`/search`, { key })
            return response.data
        } catch (error) {
            throw new Error("API fetchMessage error!")
        }
    }
}

export default Api
