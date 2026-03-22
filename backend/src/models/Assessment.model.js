import mongoose, { Mongoose }  from "mongoose";

const assessmentSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        goal:{
            type:String,
            required:[true,"Goal is required"],
            trim:true,
              // free text for now
      // example: "Learn React"
      // we will add dropdown/enum later
        },

        targetWeeks:{
            type:Number,
            required: [true, "Target weeks is required"],
            min: [1, "Minimum 1 week"],
            max: [52, "Maximum 52 weeks"],
        },

      hoursPerDay: {
           type: Number,
           required: [true, "Hours per day is required"],
           min: [0.5, "Minimum 30 minutes"],
           max: [12, "Maximum 12 hours"],
    },

     isPathGenerated: {
      type: Boolean,
      default: false,
    },
    },
    {
    timestamps: true,
    }
)

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;