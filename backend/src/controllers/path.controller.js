import { generateLearningPath } from "../services/pathgenerator.service.js";

import Assessment from "../models/Assessment.model.js";
import LearningPath from "../models/LearningPath.model.js"

// ================================
// GENERATE LEARNING PATH
// POST /api/path/generate
// takes assessmentId
// calls GPT
// saves learning path
// ================================

const generatePath = async (req, res) => {
    try {
        const { assessmentId } = req.body
        
        
        
        if (!assessmentId) {
            return res.status(400).json({
                success: false,
                message: "Assessment ID is required",
            })
        }

        // find assessment

        const assessment = await Assessment.findOne({
            _id: assessmentId,
            userId: req.user._id,
            // make sure it belongs to this user
        })

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: "Assessment not found",
            })
        }

        // check if path already generated
        // for this assessment


        if (assessment.isPathGenerated) {
            return res.status(400).json({
                success: false,
                message: "Learning path already generated for this assessment",
            })
        }

        // call GPT to generate topics
        // this is the core AI call
        const topics = await generateLearningPath({
            goal: assessment.goal,
            targetWeeks: assessment.targetWeeks,
            hoursPerDay: assessment.hoursPerDay,
        })

        const learningPath = await LearningPath.create({
            userId: req.user._id,
            assessmentId: assessment._id,
            goal: assessment.goal,
            targetWeeks: assessment.targetWeeks,
            hoursPerDay: assessment.hoursPerDay,
            topics,
            totalTopics: topics.length,
            // all other fields have defaults
        })

        assessment.isPathGenerated = true
        await assessment.save({ validateBeforeSave: false })

        return res.status(201).json({
            success: true,
            message: "Learning path generated successfully",
            learningPath,
        })
    }
    catch (error) {
        console.log(error.message);
        
        // if GPT fails — return clear error
        // assessment is NOT marked as generated
        // so user can retry without refilling form
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ================================
// GET ALL PATHS OF USER
// GET /api/path/all
// returns all learning paths
// shown as cards on home screen
// ================================

const getAllPaths = async (req, res) => {
    try {
        const paths = await LearningPath.find({
            userId: req.user._id,
        })
            .select(
                // only return fields needed for card
                // not the full topics array
                // topics array can be very large
                "goal targetWeeks hoursPerDay totalTopics completedTopics progressPercentage currentStreak badges status createdAt"
            ).sort({ created: -1 })

        return res.status(200).json({
            success: true,
            count: paths.length,
            paths
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
// GET SINGLE PATH
// GET /api/path/:id
// returns full path with all topics
// shown on individual path dashboard
// ================================

const getPath = async (req, res) => {
    try {
        const path = await LearningPath.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!path) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found",
            })
        }

        // sort topics by weekNumber then dayNumber
        // so dashboard shows them in correct order
        path.topics.sort((a, b) => {
            if (a.weekNumber !== b.weekNumber) {
                return a.weekNumber - b.weekNumber
            }
            return a.dayNumber - b.dayNumber
        })

        return res.status(200).json({
            success: true,
            path,
        })
    }
    catch (error) {
        // console.log(error);
        
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const updatePathStatus = async (req, res) => {
    try {
        const { status } = req.body

        if (!["active", "archieved"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be active or archived",
            })
        }

        const path = await LearningPath.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!path) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found",
            })
        }

        // dont allow changing completed path status
        if (path.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Cannot change status of a completed path",
            })
        }

        path.status = status
        await path.save({ validateBeforeSave: false })

        return res.status(200).json({
            success: true,
            message: `Path ${status} successfully`,
            path,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ================================
// DELETE PATH
// DELETE /api/path/:id
// ================================

const deletePath = async (req, res) => {
    try {
        const path = await LearningPath.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!path) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found",
            })
        }

        await path.deleteOne()

        // reset assessment so user can
        // generate a new path from same assessment
        await Assessment.findByIdAndUpdate(path.assessmentId, {
            isPathGenerated: false,
        })

        return res.status(200).json({
            success: true,
            message: "Learning path deleted successfully",
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
    generatePath,
    getAllPaths,
    getPath,
    updatePathStatus,
    deletePath
}