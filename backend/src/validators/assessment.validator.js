import Joi from "joi"


const assessmentSchema = Joi.object({
    goal: Joi.string()
        .valid(
            "Full Stack Development",
            "Data Science",
            "DSA & Competitive Programming",
            "Android Development",
            "DevOps & Cloud"
        )
        .required()
        .messages({
            "any.only": "Please select a valid goal from the list",
            "any.required": "Goal is required"
        }),

    targetWeeks: Joi.number()
        .min(1)
        .max(52)
        .required()
        .messages({
            "number.min": "Minimum 1 week",
            "number.max": "Maximum 52 weeks",
            "any.required": "Target weeks is required",
        }),

    hoursPerDay: Joi.number()
        .min(0.5)
        .max(12)
        .required()
        .messages({
            "number.min": "Minimum 30 minutes per day",
            "number.max": "Maximum 12 hours per day",
            "any.required": "Hours per day is required",
        }),
})

export  {assessmentSchema}