import mongoose from "mongoose"
import config from "../config"

const connectDatabase = async () => {
    try {
        await mongoose
            .connect(config.mongoUri)
            .then(() => console.log("[server] Connected to MongoDB"))
            .catch((err) => console.log(err))
    } catch (err: any) {
        console.error(err)
    }
}

export default connectDatabase
