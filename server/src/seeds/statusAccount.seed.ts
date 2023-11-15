import StatusAccount from "../models/StatusAccount"

const statuses = [{ name: "Offline" }, { name: "Online" }]

const seedStatusAccount = async () => {
    for (const status of statuses) {
        const existingStatus = await StatusAccount.findOne({ name: status.name })
        if (!existingStatus) await StatusAccount.create(status)
    }
}

export default seedStatusAccount
