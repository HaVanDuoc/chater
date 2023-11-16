import express from "express"
import initRoute from "./routes"
import dotenv from "dotenv"
import connectDB from "./utils/connectDB"
import config from "./config"
import cors from "cors"

const app = express()
dotenv.config()

//middleware
app.use(express.json())
app.use(cors({ origin: [config.clientHost] }))

// Router
initRoute(app)

app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`)
    connectDB()
})
