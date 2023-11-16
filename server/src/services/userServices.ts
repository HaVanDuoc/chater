import Role from "../models/Role"
import User from "../models/User"

namespace UserServices {
    export const getOne = async (userId: any) => {
        try {
            const user = await User.findOne({ _id: userId }).exec()

            console.log("user", user)

            return { message: "Get data succeeded" }
        } catch (error) {
            return error
        }
    }
}

export default UserServices
