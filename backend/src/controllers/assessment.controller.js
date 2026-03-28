import Assessment from "../models/Assessment.model.js";
import { assessmentSchema } from "../validators/assessment.validator.js";

// ================================
// CREATE ASSESSMENT
// POST /api/assessment/create
// user submits the form
// ================================

const createAssessment = async (req, res) => {
    try {
        // validate request body
        const { error } = assessmentSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((d) => d.message),
            })
        }

        const { goal, targetWeeks, hoursPerDay } = req.body

        // create assessment
        // req.user is set by verifyToken middleware

        const assessment = await Assessment.create({
            userId: req.user._id,
            goal,
            targetWeeks,
            hoursPerDay,
        })

        return res.status(201).json({
            success: true,
            message: "Assessment created successfully",
            assessment,
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",

        })
    }
}

// ================================
// GET ALL ASSESSMENTS OF USER
// GET /api/assessment/all
// returns all assessments user created
// ================================

const getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find({
            userId: req.user._id,
        }).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            count: assessments.length,
            assessments,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ================================
// GET SINGLE ASSESSMENT
// GET /api/assessment/:id
// returns one specific assessment
// ================================

const getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findOne({
            _id: req.params.id,
            userId: req.user._id,
            // userId check makes sure
            // user can only see their own assessment
            // not someone else's
        })

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: "Assessment not found",
            })
        }

        return res.status(200).json({
            success: true,
            assessment,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ================================
// DELETE ASSESSMENT
// DELETE /api/assessment/:id
// deletes one assessment
// only if no path is generated from it
// ================================

const deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: "Assessment not found",
            })
        }

        // dont allow delete if path already generated
        if (assessment.isPathGenerated) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete assessment that has a learning path generated",
            })
        }

        await assessment.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Assessment deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export {
    createAssessment,
    getAllAssessments,
    getAssessment,
    deleteAssessment
}