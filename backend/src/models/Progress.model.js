import mongoose from "mongoose";


const progressSchema = new mongoose.Schema(
    {
        // ================================
    // LINKS — who did what on which path
    // ================================
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        // whose activity is this
    },

    LearningPathId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LearningPath",
        required:true,

       // which learning path this
      // topic belongs to
      // needed to update that path's
      // completedTopics and streak
    },

    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,

       // which specific topic was ticked
      // this is the _id from topicSchema
      // inside LearningPath.topics array
    },

    // ================================
    // TOPIC DETAILS
    // copied from topic at time of tick
    // so we dont need to join just
    // to show activity history
    // ================================

    topicTitle:{
        type:String,
        required:true,

      // example: "HTML Basics"
      // copied from topic.title
      // when user ticks the topic
    },

    weekNumber:{
        type:Number,
        required:true,

        // which week this topic was in
      // copied from topic.weekNumber
      // useful for weekly activity reports
    },

    dayNumber:{
        type:Number,
        required:true,

        // which day this topic was in
      // copied from topic.dayNumber
    },
    // ================================
    // COMPLETION
    // ================================
    
    completedAt:{
        type:Date,
        default:Date.now,

        // exact timestamp when user ticked
      // used for:
      //   streak calculation
      //   activity history display
      //   "completed on Jan 1" label
    },
    },
    {
    timestamps: true,
    // createdAt = same as completedAt basically
    // updatedAt = if user unticks and reticks
  }
);

// ================================
// INDEX
// makes database queries faster
// we always query by userId + learningPathId
// ================================

progressSchema.index(
  { userId: 1, LearningPathId: 1, topicId: 1 },
  { unique: true }
);

const Progress = mongoose.model("Progress",progressSchema)

export default Progress