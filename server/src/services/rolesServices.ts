import Role from "../models/Role"

namespace RoleServices {
    export const getOne = async (data: any) => {
        try {
            const role = await Role.findOne({ name: "User" }).select("_id").exec()
            return { message: "Login successful" }
        } catch (error) {
            throw new Error("Login Failed")
        }
    }
}

export default RoleServices
