import Progress from "../models/Progress.model.js"

import LearningPath from "../models/LearningPath.model.js"


// ================================
// TICK TOPIC
// POST /api/progress/tick/:topicId
// ================================

const tickTopic = async (req, res) => {
    try {
        const { topicId } = req.params
        const { pathId } = req.body

        if (!pathId) {
            return res.status(400).json({
                success: false,
                message: "pathId is required",
            })
        }

        // find learning path

        const learningPath = await LearningPath.findOne({
            _id: pathId,
            userId: req.user._id,
        })

        if (!learningPath) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found"
            })
        }

        const topic = learningPath.topics.id(topicId)

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            })
        }

        // check if already ticked
        const alreadyTicked = await Progress.findOne({
            userId: req.user._id,
            learningPathId: pathId,
            topicId
        })

        if (alreadyTicked) {
            return res.status(400).json({
                success: false,
                message: "Topic already completed",
            })
        }

        await Progress.create({
            userId: req.user._id,
            learningPathId: pathId,
            topicId,
            topicTitle: topic.title,
            weekNumber: topic.weekNumber,
            dayNumber: topic.dayNumber,
        })

        // update completed count and percentage

        const newCompletedTopics = learningPath.completedTopics + 1
        const newProgressPercentage = Math.round(
            (newCompletedTopics / learningPath.totalTopics) * 100
        )

        learningPath.completedTopics = newCompletedTopics
        learningPath.progressPercentage = newProgressPercentage

        await learningPath.save()

        return res.status(200).json({
            success:true,
            message: "Topic marked as complete",
            data: {
                completedTopics: newCompletedTopics,
                totalTopics: learningPath.totalTopics,
                progressPercentage: newProgressPercentage,
                isPathCompleted:
                    newCompletedTopics === learningPath.totalTopics
            },
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
// UNTICK TOPIC
// DELETE /api/progress/untick/:topicId
// ================================


const untickTopic = async (req, res) => {
    try {
        const { topicId } = req.params
        const { pathId } = req.body

        if (!pathId) {
            return res.status(400).json({
                success: false,
                message: "pathId is required",
            })
        }

        // find and delete progress record

        const progressRecord = await Progress.findOne({
            userId: req.user._id,
            learningPath: pathId,
            topicId,
        })

        if (!progressRecord) {
            return res.status(404).json({
                success: false,
                message: "Topic not marked as complete yet",
            })
        }

        await progressRecord.deleteOne()

        // find learning path and update counts

        const learningPath = await LearningPath.findOne({
            _id: pathId,
            userId: req.user._id,
        })

        if (!learningPath) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found",
            })
        }

        const newCompletedTopics = Math.max(
            0,
            learningPath.completedTopics - 1
        )
        const newProgressPercentage = Math.round(
            (newCompletedTopics / learningPath.totalTopics) * 100
        )

        learningPath.completedTopics = newCompletedTopics
        learningPath.progressPercentage = newProgressPercentage

        // revert completed status if unticked
        if (learningPath.status === "completed") {
            learningPath.status = "active"
            learningPath.completedAt = null
        }

        await learningPath.save()

        return res.status(200).json({
            success: true,
            message: "Topic unmarked successfully",
            data: {
                completedTopics: newCompletedTopics,
                totalTopics: learningPath.totalTopics,
                progressPercentage: newProgressPercentage,
            },
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
// GET COMPLETED TOPICS FOR A PATH
// GET /api/progress/:pathId
// frontend uses completedTopicIds
// to know which checkboxes to tick
// ================================

const getCompletedTopics = async (req, res) => {
    try {
        const { pathId } = req.params

        const completedTopics = await Progress.find({
            userId: req.user._id,
            learningPathId: pathId,
        }).select("topicId topicTitle weekNumber dayNumber completedAt")

        const completedTopicsIds = completedTopics.map(
            (p) => p.topicId.toString()
        )
        return res.status(200).json({
            success: true,
            completedTopicsIds,
            completedTopics,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ================================
// GET PATH STATS
// GET /api/progress/stats/:pathId
// shows progress bar data
// ================================

const getPathStats = async (req, res) => {
    try {
        const { pathId } = req.params

        const learningPath = await LearningPath.findOne({
            _id: pathId,
            userId: req.user._id,
        }).select(
            "goal totalTopics completedTopics progressPercentage status"
        )

        if (!learningPath) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found",
            })
        }

        return res.status(200).json({
            success: true,
            stats: {
                goal: learningPath.goal,
                totalTopics: learningPath.totalTopics,
                completedTopics: learningPath.completedTopics,
                progressPercentage: learningPath.progressPercentage,
                status: learningPath.status,
            },
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
    tickTopic,
    untickTopic,
    getCompletedTopics,
    getPathStats
}