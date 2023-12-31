import Chat from "../models/Chat"
import User from "../models/User"

namespace SearchServices {
    export const search = async (key: string, current_user_id: string) => {
        try {
            const current_user = await User.findById(current_user_id).select("friends").exec()

            var result: { friends: any[]; others: any[] } = {
                friends: [],
                others: [],
            }

            // Search in list friends
            const friends = await User.find({
                $and: [{ _id: { $ne: current_user_id } }, { _id: { $in: current_user?.friends } }],
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .select("name email picture")
                .exec()

            if (friends.length) {
                result.friends = friends

                for (let index = 0; index < friends.length; index++) {
                    let element = friends[index]

                    const chat = await Chat.findOne({
                        $or: [
                            { members: [current_user_id, element?._id] },
                            { members: [element?._id, current_user_id] },
                        ],
                    })
                        .select("_id")
                        .exec()

                    // friends[index].chat = chat ? chat._id : null
                }
            } else {
                const others = await User.find({
                    $and: [{ _id: { $ne: current_user_id } }],
                    $or: [
                        { name: { $regex: key, $options: "i" } },
                        { email: { $regex: key, $options: "i" } },
                    ],
                })
                    .select("name email picture")
                    .exec()

                result.others = others
            }

            return { message: "Get data succeeded", data: result }
        } catch (error) {
            return error
        }
    }
}

export default SearchServices
