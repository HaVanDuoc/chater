import express from "express"
import initRoute from "./routes"
import dotenv from "dotenv"

const app = express()
dotenv.config()

//middleware
app.use(express.json())

// Router
initRoute(app)

const port = 5000

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
