import User from "../models/User"

namespace SearchServices {
    export const search = async (key: string, current_user_id: string) => {
        try {
            const current_user = await User.findById(current_user_id).select("friends").exec()

            // Search in list friends
            const friends = await User.find({
                $and: [{ _id: { $ne: current_user_id } }, { _id: { $in: current_user?.friends } }],
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .select("displayName email picture")
                .exec()

            return { message: "Get data succeeded", data: friends }
        } catch (error) {
            return error
        }
    }
}

export default SearchServices
