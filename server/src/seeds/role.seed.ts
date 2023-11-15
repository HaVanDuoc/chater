import Role from "../models/Role"

const roles = [{ name: "User" }, { name: "Admin" }]

const seedRoles = async () => {
    for (const role of roles) {
        const existingRole = await Role.findOne({ name: role.name })
        if (!existingRole) await Role.create(role)
    }
}

export default seedRoles
