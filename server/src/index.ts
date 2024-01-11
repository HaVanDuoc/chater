import express from "express"
import initRoute from "./routes"
import dotenv from "dotenv"
import connectDatabase from "./utils/connectDatabase"
import config from "./config"
import cors from "cors"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

const app = express()

//middleware
dotenv.config()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    session({
        secret: process.env["SECRET_KEY"] || "*",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
        store: new MongoStore({
            mongoUrl: process.env["MONGO_URI"],
        }),
    }),
)
app.use(passport.authenticate("session"))

// Router
initRoute(app)

app.listen(config.port, () => {
    console.log(`[server] Server is running at http://localhost:${config.port}`)
    connectDatabase()
})
