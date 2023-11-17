import Role from "../models/Role"
import User from "../models/User"

namespace UserServices {
    export const getOne = async (userId: any) => {
        try {
            const user = await User.findOne({ _id: userId })
                .populate({ path: "role", select: "name" })
                .populate({ path: "status", select: "name" })
                .exec()

            return { message: "Get data succeeded", data: user }
        } catch (error) {
            return error
        }
    }
}

export default UserServices
