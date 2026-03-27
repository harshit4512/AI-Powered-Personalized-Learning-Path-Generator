import express from "express";

import {register,login,logout ,refreshToken,getMe,googleAuth,googleAuthCallback} from "../controllers/auth.controller.js"

import passport from "../config/passport.js";
import { verifyToken } from "../middleware/auth.middleware.js"

const router= express.Router()

// public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// protected routes
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, getMe);


// ================================
// GOOGLE AUTH ROUTES
// ================================

// Step 1 — user hits this route
// gets redirected to google consent screen
router.get("/google", googleAuth)

// Step 2 — google redirects back here
// after user approves
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLINET_URI}/login?error=google_auth_failed`,
  }),
  googleAuthCallback
)
export default router;