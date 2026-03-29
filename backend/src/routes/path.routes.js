import express from "express"
import { generatePath, deletePath,getAllPaths,getPath,updatePathStatus} from "../controllers/path.controller.js"

import {verifyToken} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/generate", verifyToken, generatePath)
router.get("/all", verifyToken, getAllPaths)
router.get("/:id", verifyToken, getPath)
router.patch("/:id/status", verifyToken, updatePathStatus)
router.delete("/:id", verifyToken, deletePath)

export default router