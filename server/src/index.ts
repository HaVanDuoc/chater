import express from "express"
import initRoute from "./routes"
import dotenv from "dotenv"
import connectDatabase from "./utils/connectDatabase"
import config from "./config"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL || "*"
const SERVER_URL = process.env.SERVER_URL || "*"

console.log('CLIENT_URL', CLIENT_URL)
console.log('SERVER_URL', SERVER_URL)

const corsOptions = {
    origin: [CLIENT_URL, SERVER_URL],
    credentials: true,
}

const app = express()

//middleware
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    session({
        secret: process.env["SECRET_KEY"] || "*",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 4 * 60 * 60 * 1000 }, // 4 hour
        store: new MongoStore({
            mongoUrl: process.env["MONGO_URI"],
        }),
    }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate("session"))

// Router
initRoute(app)

app.listen(config.port, () => {
    console.log(`[server] Server is running at http://localhost:${config.port}`)
    connectDatabase()
})
