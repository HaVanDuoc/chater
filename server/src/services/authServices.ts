import User, { IUser } from "../models/User"
import { signToken } from "../helpers"

namespace AuthServices {
    export const login = async (userData: IUser) => {
        try {
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

            const user: any = await User.findOne({ email: userData?.email })
                .populate("role", "name")
                .populate("friends", "name picture")
                .exec()

            // Create token
            const token = signToken(user?._id, user?.name)
            if (token) {
                user["token"] = token
            }

            return { message: "Login successful", data: user }
        } catch (error) {
            return error
        }
    }
}

export default AuthServices
