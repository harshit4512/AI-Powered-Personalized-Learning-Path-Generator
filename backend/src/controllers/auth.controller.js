import User from "../models/User.model.js"

import { generateAccessToken, generateRefreshToken, setTokenCookies } from "../utils/generateToken.js"
import passport from "../config/passport.js"
import { registerSchema, loginSchema } from "../validators/auth.validator.js"

import jwt from "jsonwebtoken"

// ================================
// REGISTER
// POST /api/auth/register
// ================================

const register = async (req, res) => {
    try {
        // validate request body

        const { error } = registerSchema.validate(req.body, {
            abortEarly: false,
        })


        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((d) => d.message),
            });
        }

        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            authProvider: ["local"],
        });

        // generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        // save refresh token to database
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });

        // set tokens as httpOnly cookies
        // browser stores automatically
        // frontend does not need to do anything
        setTokenCookies(res, accessToken, refreshToken);

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: user.toSafeObject(),
            // no tokens in response body
            // they are in cookies now
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================================
// LOGIN
// POST /api/auth/login
// ================================

const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((d) => d.message),
            });
        }

        const { email, password } = req.body;

        // bring password back explicitly
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        if (!user.authProvider.includes("local")) {
            return res.status(401).json({
                success: false,
                message: "Please login with Google",
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // set cookies
        setTokenCookies(res, accessToken, refreshToken);

        // console.log(user.isonbor);
        
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: user.toSafeObject(),

        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================================
// LOGOUT
// POST /api/auth/logout
// ================================

const logout = async (req, res) => {
    try {
        // clear refresh token from database

        await User.findByIdAndUpdate(
            req.user._id,
            { refreshToken: null },
            { new: true }
        );

        // clear both cookies from browser
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================================
// REFRESH TOKEN
// POST /api/auth/refresh
// ================================

const refreshToken = async (req, res) => {
    try {
        // read refresh token from cookie
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No refresh token found. Please login again",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id).select("+refreshToken");

        if (!user || user.refreshToken !== token) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token. Please login again",
            });
        }

        // generate new tokens
        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        // set new cookies
        setTokenCookies(res, newAccessToken, newRefreshToken);

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};


// ================================
// GET CURRENT USER
// GET /api/auth/me
// ================================
const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user.toSafeObject(),
        });

    } catch (error) {
            console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
            
        });
    }
};

// ================================
// GOOGLE AUTH INITIATE
// GET /api/auth/google
// this route redirects user to google
// ================================

const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
    // asking google for:
    // profile → name and avatar
    // email   → email address
    session: false,
    // no session because we use cookies
})

// ================================
// GOOGLE AUTH CALLBACK
// GET /api/auth/google/callback
// google redirects here after user approves
// ================================

const googleAuthCallback = async (req, res) => {
    try {
        // req.user is set by passport strategy
        // after google sends back user info

        const user = req.user

        if (!user) {
            return res.redirect(
                `${process.env.CLIENT_URI}/login?error=google_auth_failed`
            )
        }

        // generate tokens
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        // save refresh token to database
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        // set cookies
        setTokenCookies(res, accessToken, refreshToken)

        // redirect to frontend dashboard
        // google auth always redirects
        // cannot send JSON response here
        // console.log(user.isOnboardingComplete);
        
       return res.redirect(
  `${process.env.CLIENT_URI}/authsuccess`
)

    }
    catch (error) {
        return res.redirect(
            `${process.env.FRONTEND_URL}/login?error=server_error`
        )
    }

}
export {
    register,
    login,
    logout,
    refreshToken,
    getMe,
    googleAuth,
    googleAuthCallback
}