import User, { IUser } from "../models/User"

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

            const user = await User.findOne({ email: userData?.email })

            return { message: "Login successful", data: user }
        } catch (error) {
            return error
        }
    }
}

export default AuthServices
