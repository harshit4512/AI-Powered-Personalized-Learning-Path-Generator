import express from "express"
import { createAssessment,getAllAssessments,getAssessment,deleteAssessment} from "../controllers/assessment.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()

// all assessment routes are protected
// user must be logged in
// verifyToken checks cookie automatically

router.post("/create",verifyToken,createAssessment)
router.get("/all",verifyToken,getAllAssessments)
router.get("/:id",verifyToken,getAssessment)
router.delete("/:id",verifyToken,deleteAssessment)

export default router
