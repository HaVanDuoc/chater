import User, { IUser } from "../models/User"
import { signToken } from "../helpers"
import executeDB from "./db"

namespace AuthServices {
    export const login = async (userData: IUser, access_token: string) => {
        try {
            var data: { token?: string; invites?: any[]; chats?: any; access_token?: string } = {}

            // Check existing user
            // And get user info
            const find = await User.findOne({ email: userData?.email })

            if (find) {
                let hasChanges = false

                // Loop check user data has changes to the origin data
                for (const key in userData) {
                    if (userData.hasOwnProperty(key) && find.hasOwnProperty(key)) {
                        if (userData[key as keyof IUser] !== find[key as keyof IUser]) {
                            hasChanges = true
                            break
                        }
                    }
                }

                // If there are changes, update user
                if (hasChanges) {
                    await User.updateOne(userData)
                }
            } else {
                // If not find user, create new user
                await User.create(userData)
            }

            // Info current user
            const user: any = await User.findOne({ email: userData?.email })
                .populate("role", "name")
                .populate("friends", "name picture")
                .exec()

            data = { ...user._doc }
            data["token"] = signToken(user?._id, user?.name) // create token
            data["invites"] = await executeDB.getInvites(user?._id) // get list invites
            // data.chats = await executeDB.getChats(user?._id)
            data["access_token"] = access_token

            return { message: "Đăng nhập thành công!", data: data }
        } catch (error) {
            return error
        }
    }
}

export default AuthServices
