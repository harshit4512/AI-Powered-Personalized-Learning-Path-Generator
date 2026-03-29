import mongoose from "mongoose";

// ================================
// SUB SCHEMA — single link
// GPT gives multiple links per topic
// user chooses which one to use
// ================================

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    // example: "https://youtube.com/watch?v=abc"
  },

  source: {
    type: String,
    required: true,

    // example: "YouTube" / "MDN" / "freeCodeCamp"
    // shown as small tag next to link
  },
},
  {
    _id: false,
    // no separate ID needed for each link
    // links dont get referenced anywhere
    // they just display inside a topic
  }
);

// ================================
// SUB SCHEMA — single topic
// one row in your dashboard checklist
// ================================

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // example: "JavaScript Arrays and Objects"
      // comes directly from GPT
    },

    links: {
      type: [linkSchema],
      default: [],
      // array because GPT gives
      // multiple links per topic
      // example:
      // [
      //   { url: "youtube.com/...", source: "YouTube" },
      //   { url: "mdn.com/...",     source: "MDN" },
      //   { url: "fcc.org/...",     source: "freeCodeCamp" }
      // ]
      // user picks whichever they prefer
    },

    weekNumber: {
      type: Number,
      required: true,
      // which week this topic belongs to
      // example: 1 = Week 1
      // frontend groups topics by weekNumber
    },

    dayNumber: {
      type: Number,
      required: true,
      // which day inside that week
      // example: weekNumber 1 dayNumber 3
      // means Week 1 Day 3
      // frontend sorts topics by dayNumber
      // inside each week
    }
  },
  {
    _id: true,
    // each topic needs its own unique ID
    // Progress model stores this topicId
    // when user ticks a specific topic
  }
);


// ================================
// MAIN LEARNING PATH SCHEMA
// ================================

const learningPathSchema = new mongoose.Schema(
  {
    // ================================
    // LINKS TO OTHER MODELS
    // ================================   

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // whose learning path is this
    },

    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
      // which form submission created this path
      // if GPT fails — we know which assessment
      // to retry without user refilling form   
    },

    // ================================
    // COPIED FROM ASSESSMENT
    // stored here so dashboard card
    // doesnt need to fetch assessment
    // collection just to show title
    // ================================

    goal: {
      type: String,
      required: true,
      // example: "Full Stack Development"
    },

    targetWeeks: {
      type: Number,
      required: true,
      // example: 8
    },

    hoursPerDay: {
      type: Number,
      required: true,
      // example: 2
    },

    // ================================
    // GPT GENERATED TOPICS
    // heart of the learning path
    // everything GPT returns stored here
    // ================================

    topics: {
      type: [topicSchema],
      default: [],

      // full roadmap from GPT
      // each topic has:
      //   title       → what to learn
      //   links       → multiple resources
      //   weekNumber  → which week
      //   dayNumber   → which day in that week
      //
      // frontend groups by weekNumber
      // then sorts by dayNumber inside week
      //
      // Week 1
      //   Day 1 → HTML Basics
      //            🔗 YouTube
      //            🔗 MDN
      //   Day 2 → CSS Flexbox
      //            🔗 YouTube
      //            🔗 freeCodeCamp
      // Week 2
      //   Day 1 → JavaScript Basics
      //            🔗 YouTube
      //            🔗 javascript.info
    },

    // ================================
    // PROGRESS SUMMARY
    // these 3 fields update every time
    // user ticks a topic
    // shown on home screen card
    // ================================

    totalTopics: {
      type: Number,
      default: 0,
      // set once when GPT returns topics
      // topics.length stored here
      // shown on card as "12/20 done"
    },

    completedTopics: {
      type: Number,
      default: 0,
      // starts at 0
      // increments by 1 every time
      // user ticks a topic
      // shown on card as "12/20 done"
    },

    progressPercentage: {
      type: Number,
      default: 0,

      // formula: completedTopics / totalTopics * 100
      // example: 12/20 * 100 = 60
      // shown as progress bar on card
      // recalculated on every tick
    },

    // ================================
    // PER PATH STREAK
    // every path has its OWN streak
    // completely independent from
    // other paths of same user
    //
    // example:
    // React path  → streak: 5 days
    // DSA path    → streak: 2 days
    // Node path   → streak: 0 days
    // ================================

    currentStreak: {
      type: Number,
      default: 0,

      // consecutive days user ticked
      // at least one topic in THIS path
      // resets to 1 if user misses a day
    },

    longestStreak: {
      type: Number,
      default: 0,

      // highest streak ever on this path
      // never resets — only goes up
      // updated when currentStreak > longestStreak
    },

    lastActiveDate: {
      type: Date,
      default: null,
      // last date user ticked any topic
      // in this specific path
      //
      // streak calculation:
      // today - lastActiveDate = 0 days → same day, no change
      // today - lastActiveDate = 1 day  → consecutive, increment
      // today - lastActiveDate > 1 day  → missed days, reset to 1
    },

    // ================================
    // PER PATH BADGES
    // earned specifically for this path
    // ================================
    badges: {
      type: [String],
      default: [],
      // badges earned on THIS path only
      //
      // "first_topic"   → ticked very first topic
      // "halfway"       → 50% topics completed
      // "seven_streak"  → 7 consecutive days
      // "thirty_streak" → 30 consecutive days
      // "completed"     → all topics ticked
    },

    // ================================
    // PATH STATUS
    // controls what section of
    // home screen this card appears in
    // ================================
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
      // "active"    → user is working on this
      //               shows in main cards section
      //
      // "completed" → all topics ticked
      //               auto set when completedTopics
      //               equals totalTopics
      //               shows in completed section
      //
      // "archived"  → user manually stopped this
      //               shows in archived section
      //               can be re-activated anytime
    },

    completedAt: {
      type: Date,
      default: null,
      // null until all topics are ticked
      // set automatically when status
      // becomes "completed"
    },

  },
  {
    timestamps: true,
    // createdAt → when GPT generated this path
    // updatedAt → last time any field changed
  }
);

const LearningPath = mongoose.model("LearningPath", learningPathSchema);

export default LearningPath;