import { Schema } from "mongoose"
import Invite from "../models/Invite"
import User, { IUser } from "../models/User"

namespace UserServices {
    export const getUser = async (user_id?: string) => {
        try {
            let user = await User.findById(user_id).exec()
            return { message: "Get data succeeded", user }
        } catch (error) {
            return error
        }
    }

    // Suggest Friends
    export const getSuggestFriends = async (user_id: any) => {
        try {
            const listFriendsOfCurrentUser = await User.findById(user_id).select("friends").exec()

            const listSuggest = await User.find({
                _id: { $ne: user_id, $nin: listFriendsOfCurrentUser?.friends },
            })
                .select("displayName email picture")
                .exec()

            return { message: "Get list suggest success", data: listSuggest }
        } catch (error) {
            return error
        }
    }
    // Suggest Friends
    export const getListFriends = async (current_user_id: any) => {
        try {
            const list = await User.findById(current_user_id)
                .select("friends")
                .populate("friends", "displayName picture email")
                .exec()

            return { message: "Get list friend success", data: list?.friends }
        } catch (error) {
            return error
        }
    }

    export const getOne = async (userId: any) => {
        try {
            const user = await User.findOne({ _id: userId })
                .populate({ path: "role", select: "name" })
                // .populate({ path: "status", select: "name" })
                .populate({ path: "friends", select: "-createdAt -updateAt -__v" })
                .exec()

            return { message: "Get data succeeded", data: user }
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string, userId: IUser["_id"]) => {
        try {
            const current_user = await User.findById(userId).select("friends").exec()

            var result: { friends: any[]; others: any[] } = {
                friends: [],
                others: [],
            }

            // Search in list friends
            const friends = await User.find({
                $and: [{ _id: { $ne: userId } }, { _id: { $in: current_user?.friends } }],
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .select("name email picture")
                .exec()

            if (friends.length) {
                result.friends = friends
            } else {
                const others = await User.find({
                    $and: [{ _id: { $ne: userId } }],
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

    export const deleteFriend = async (current_user_id: any, friend_id: any) => {
        console.log("friend_id", friend_id)

        const checkFriend = async () => {
            const user = await User.findById(current_user_id)
            console.log("user", user)
            if (user) {
                const friend = user.friends.some((id: any) => id == friend_id)
                console.log("friend", friend)
                return friend
            }
            return null
        }

        try {
            // check friends
            const check = await checkFriend()
            if (!check) {
                return { message: "Cả hai chưa từng là bạn!" }
            }

            const deleteInCurrentUser = await User.findByIdAndUpdate(current_user_id, {
                $pull: { friends: friend_id },
            })
            const deleteInOthers = await User.findByIdAndUpdate(friend_id, {
                $pull: { friends: current_user_id },
            })

            if (deleteInCurrentUser && deleteInOthers) {
                return { message: "Đã xóa bạn bè!" }
            }

            return { message: "Error! Please again." }
        } catch (error) {
            return error
        }
    }
}

export default UserServices
