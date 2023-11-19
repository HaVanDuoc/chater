import { decodeToken } from "../helpers"
import User, { IUser } from "../models/User"

namespace UserServices {
    export const getOne = async (userId: any) => {
        try {
            const user = await User.findOne({ _id: userId })
                .populate({ path: "role", select: "name" })
                .populate({ path: "status", select: "name" })
                .populate({ path: "friends", select: "-createdAt -updateAt -__v" })
                .exec()

            return { message: "Get data succeeded", data: user }
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string, userId: IUser["_id"]) => {
        try {
            const result = await User.find({
                $and: [{ _id: { $ne: userId } }],
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .select("name email picture")
                .exec()

            return { message: "Get data succeeded", data: result }
        } catch (error) {
            return error
        }
    }

    export const addFriend = async (myId: string, friendId: string) => {
        const checkFriend = async () => {
            const user = await User.findById(myId)
            if (user) {
                const friend = user.friends.find((id: any) => id === friendId)
                return friend
            }
            return null
        }

        try {
            // check friends
            const check = await checkFriend()
            if (check) {
                return { message: "Both of you were friends" }
            }

            const addYou = await User.findByIdAndUpdate(myId, { $push: { friends: friendId } })
            const addMe = await User.findByIdAndUpdate(friendId, { $push: { friends: myId } })

            if (addYou && addMe) {
                return { message: "Add friend success" }
            }

            return { message: "Error! Please again." }
        } catch (error) {
            return error
        }
    }
}

export default UserServices
