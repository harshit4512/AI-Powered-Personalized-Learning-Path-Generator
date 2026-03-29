import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import passport from "./config/passport.js"
import assessmentRoutes from "./routes/assessment.routes.js"

import pathRoutes from "./routes/path.routes.js"
// errorHandler is needed right now
// because app.js uses it at the bottom

import { errorHandler } from "./middleware/errorHandler.middleware.js"
import authRoutes from "./routes/auth.routes.js"
// ================================
// ROUTES IMPORTS
// uncomment as you build each feature
// ================================
// loads your .env file into process.env
dotenv.config()

// creates your express application
const app=express()

// ================================
// SECURITY
// ================================

// helmet sets secure HTTP headers automatically
// protects against common attacks like XSS, clickjacking

app.use(helmet());


// cors allows your React frontend (localhost:5173)
// to talk to this backend (localhost:5000)
// without this, browser will block all requests
app.use(
    cors({
        origin:process.env.CLIENT_URI,
        credentials:true,
        methods:["GET","POST","PUT","DELETE","PATCH"],

    })
)


// allows your server to read JSON sent from frontend
// limit 10kb prevents oversized request attacks
app.use(express.json({ limit: "10kb" }));

// allows reading form data sent from frontend
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ================================
// COOKIE PARSER
// must be after body parsing
// must be before routes
// so req.cookies works in every controller
// ================================
app.use(cookieParser())


// initialize passport
// no session needed because we use JWT cookies
app.use(passport.initialize())

// hit http://localhost:5000/api/health to verify
// server + database are both running correctly

app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"server is running",
        enevironment:process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

// ================================
// ROUTES
// uncomment each route only when
// you have built that feature
// ================================

// --- active now ---
// authenication routes
app.use("/api/auth", authRoutes)

// assesmentroutes

app.use("/api/assessment", assessmentRoutes)

// pathroutes
app.use("/api/path", pathRoutes)


// ================================
// 404 HANDLER
// catches any route that doesn't exist
// must be after all routes
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ================================
// GLOBAL ERROR HANDLER
// catches any error thrown in controllers
// must always be the very last middleware
// ================================
app.use(errorHandler);

export default app