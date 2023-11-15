import dotenv from "dotenv"
import _ from "lodash"

dotenv.config()

const env: string = process.env.NODE_ENV || "development"

const development = {
    jwtSecret: process.env.JWT_SECRET || "*",
    jwtAccess: process.env.JWT_ACCESS_KEY || "*",
    jwtRefresh: process.env.JWT_REFRESH_KEY || "*",
    port: _.toNumber(process.env.PORT),
    serverHost: process.env.SERVER_HOST,
    clientHost: process.env.CLIENT_HOST || "*",
    mongoUri: process.env.MONGO_URI || "*",
    name: "development",
}

const production = {
    jwtSecret: process.env.JWT_SECRET || "*",
    jwtAccess: process.env.JWT_ACCESS_KEY || "*",
    jwtRefresh: process.env.JWT_REFRESH_KEY || "*",
    port: _.toNumber(process.env.PORT_PROD),
    serverHost: process.env.SERVER_HOST_PROD,
    clientHost: process.env.CLIENT_HOST_PROD || "*",
    mongoUri: process.env.MONGO_URI || "*",
    name: "production",
}

const config = {
    development,
    production,
}

export default config[env as keyof typeof config]
