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

    export const search = async (key: string) => {
        try {
            const result = await User.find({
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .populate({ path: "role", select: "name" })
                .populate({ path: "status", select: "name" })
                .exec()

            return { message: "Get data succeeded", data: result }
        } catch (error) {
            return error
        }
    }
}

export default UserServices
