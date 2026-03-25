import express from "express";

import {register,login,logout ,refreshToken,getMe} from "../controllers/auth.controller.js"

import { verifyToken } from "../middleware/auth.middleware.js"

const router= express.Router()

// public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// protected routes
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, getMe);

export default router;