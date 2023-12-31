import passport from "passport"
import dotenv from "dotenv"
import FederatedCredential from "../models/FederatedCredential"
import User from "../models/User"
import { Strategy } from "passport-google-oauth20"

dotenv.config()

const GOOGLE_CLIENT_ID = process.env["GOOGLE_CLIENT_ID"] || ""
const GOOGLE_CLIENT_SECRET = process.env["GOOGLE_CLIENT_SECRET"] || ""

passport.use(
    new Strategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/oauth2/redirect/google",
            scope: ["profile", "email"],
            state: true,
        },
        async function verify(accessToken: any, refreshToken: any, profile: any, cb: any) {
            const row = await FederatedCredential.findOne({
                provider: "https://accounts.google.com",
                subject: profile.id,
            })

            if (!row) {
                const newUser = await User.create({
                    displayName: profile.displayName,
                    familyName: profile.name.familyName,
                    givenName: profile.name.givenName,
                    email: profile.emails[0].value,
                    email_verified: profile.emails[0].verified,
                    picture: profile.photos?.[0]?.value,
                })
                const id = newUser._id
                await FederatedCredential.create({
                    user_id: id,
                    provider: "https://accounts.google.com",
                    subject: profile.id,
                })
                const user = await User.findById(id)
                return cb(null, user)
            } else {
                const user = await User.findById(row.user_id)
                if (!user) {
                    return cb(null, false)
                }
                return cb(null, user)
            }
        },
    ),
)

passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
        cb(null, user)
    })
})

passport.deserializeUser(function (user: any, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})
