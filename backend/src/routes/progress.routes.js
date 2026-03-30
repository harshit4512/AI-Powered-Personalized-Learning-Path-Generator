import express from "express"

import { tickTopic,untickTopic,getCompletedTopics,getPathStats } from "../controllers/progress.controller.js"

import {verifyToken} from "../middleware/auth.middleware.js"

const router=express.Router()

router.post("/tick/:topicId",verifyToken,tickTopic)
router.delete("/untick/:topicId",verifyToken,untickTopic)
router.get("/stats/:pathId", verifyToken, getPathStats)
router.get("/:pathId", verifyToken, getCompletedTopics)

export default router