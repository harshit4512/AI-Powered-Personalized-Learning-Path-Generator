import dotenv from "dotenv";
dotenv.config();
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../models/User.model.js"


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

        async (accessToken, refreshToken, profile, done) => {
            try {
                // profile is what Google sends back
                // it contains name, email, googleId, avatar

                const email = profile.emails[0].value
                const googleId = profile.id
                const name = profile.displayName

                // check if user already exists with this email
                let user = await User.findOne({ email })

                if (user) {
                    // user exists — check if they registered with google before

                    if (!user.authProvider.includes("google")) {
                        // user registered with email/password before
                        // now trying google with same email
                        // link google to their existing account
                        user.authProvider.push("google")
                        user.googleId = googleId
                        
                        // user.isEmailVerified = true

                        await user.save({ validateBeforeSave: false })
                    }

                    // user already has google account
                    // just return existing user
                    return done(null, user)
                }

                // user does not exist — create new account
                user = await User.create({
                    name,
                    email,
                    googleId,
                    authProvider: ["google"],
                    // google users are auto verified
                })
                return done(null, user)
            }
            catch (error) {
                return done(error, null)
            }
        }

    )
)


export default passport