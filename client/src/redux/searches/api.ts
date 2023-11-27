import instance from "~/utils/instanceAxios"
import { ISearch } from "./interfaces"

namespace Api {
    export const search = async (key: ISearch["key"]) => {
        try {
            const response = await instance.post(`/search`, { key })
            return response.data
        } catch (error) {
            throw new Error("API fetchMessage error!")
        }
    }
}

export default Api
