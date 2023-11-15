import dotenv from "dotenv"
import mongoose from "mongoose"
import config from "../config"
// import seedRoles from "../seeds/role.seed"
// import seedStatusAccount from "../seeds/statusAccount.seed"

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose
            .connect(config.mongoUri)
            .then(() => console.log("Connected to MongoDB"))
            // .then(() => seedRoles())
            // .then(() => seedStatusAccount())
            .catch((err) => console.log(err))
    } catch (err: any) {
        console.error(err)
    }
}

export default connectDB
