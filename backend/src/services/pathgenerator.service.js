import groq from "../config/groq.js"

// ================================
// CORRECT LEARNING ORDER PER GOAL
// we tell groq exactly what order
// topics should follow
// ================================
const goalRoadmaps = {
  "DSA & Competitive Programming": `
Follow this EXACT order for DSA & Competitive Programming:

Phase 1 - Programming Basics (if needed):
- Time & Space Complexity (Big-O Notation)
- Arrays and Strings
- Recursion and Iteration

Phase 2 - Linear Data Structures:
- Linked Lists (Singly, Doubly, Circular)
- Stacks
- Queues and Dequeues
- Hashing and Hash Maps

Phase 3 - Non-Linear Data Structures:
- Trees (Binary Tree, Binary Search Tree)
- Heaps and Priority Queues
- Tries
- Graphs (Representation, BFS, DFS)

Phase 4 - Core Algorithms:
- Sorting Algorithms (Bubble, Merge, Quick, Heap)
- Binary Search and its variations
- Two Pointers Technique
- Sliding Window Technique
- Prefix Sum

Phase 5 - Advanced Algorithms:
- Greedy Algorithms
- Backtracking
- Dynamic Programming (Memoization, Tabulation)
- Graph Algorithms (Dijkstra, Floyd Warshall, Topological Sort)
- Bit Manipulation

Phase 6 - Competitive Programming:
- Number Theory and Mathematics
- String Algorithms (KMP, Z-Algorithm)
- Segment Trees and Fenwick Trees
- Practice on LeetCode and Codeforces
`,

  "Full Stack Development": `
Follow this EXACT order for Full Stack Development:

Phase 1 - Web Fundamentals:
- HTML Basics and Semantic HTML
- CSS Basics, Flexbox, Grid
- JavaScript Fundamentals
- ES6+ Features (Arrow functions, Promises, Async/Await)
- DOM Manipulation

Phase 2 - Frontend:
- React Basics (Components, Props, State)
- React Hooks (useState, useEffect, useContext)
- React Router
- State Management (Context API or Redux)
- API Integration with Fetch/Axios

Phase 3 - Backend:
- Node.js Fundamentals
- Express.js (Routes, Middleware)
- REST API Design
- Authentication (JWT, Cookies)
- Error Handling

Phase 4 - Database:
- MongoDB Basics
- Mongoose ODM
- Database Design and Relationships
- CRUD Operations

Phase 5 - Advanced:
- Environment Variables and Security
- File Upload (Multer/Cloudinary)
- Deployment (Vercel, Railway)
- Git and Version Control
`,

  "Data Science": `
Follow this EXACT order for Data Science:

Phase 1 - Foundations:
- Python Basics
- NumPy for Numerical Computing
- Pandas for Data Manipulation
- Data Cleaning and Preprocessing

Phase 2 - Data Analysis:
- Exploratory Data Analysis (EDA)
- Data Visualization (Matplotlib, Seaborn)
- Statistics Fundamentals
- Probability Theory

Phase 3 - Machine Learning Basics:
- Supervised Learning (Linear Regression, Logistic Regression)
- Decision Trees and Random Forests
- Support Vector Machines
- Model Evaluation and Cross Validation

Phase 4 - Advanced ML:
- Unsupervised Learning (K-Means, DBSCAN)
- Dimensionality Reduction (PCA)
- Ensemble Methods (Gradient Boosting, XGBoost)
- Feature Engineering

Phase 5 - Specialization:
- Natural Language Processing Basics
- Time Series Analysis
- Deep Learning Introduction
- Real World Projects and Kaggle
`,

  "Android Development": `
Follow this EXACT order for Android Development:

Phase 1 - Kotlin Basics:
- Kotlin Fundamentals (Variables, Functions, Classes)
- Kotlin OOP (Inheritance, Interfaces)
- Kotlin Collections and Lambdas
- Coroutines Basics

Phase 2 - Android Fundamentals:
- Activities and Lifecycle
- Fragments and Navigation
- Layouts and Views (XML)
- RecyclerView and Adapters

Phase 3 - Architecture:
- ViewModel and LiveData
- Room Database
- Repository Pattern
- Dependency Injection (Hilt)

Phase 4 - Advanced:
- Retrofit for API Calls
- Jetpack Compose Basics
- Push Notifications (Firebase)
- Local Storage and SharedPreferences

Phase 5 - Production:
- App Signing and Release
- Play Store Publishing
- Performance Optimization
- Testing (Unit, UI)
`,

  "DevOps & Cloud": `
Follow this EXACT order for DevOps & Cloud:

Phase 1 - Linux and Scripting:
- Linux Command Line Basics
- Shell Scripting
- File Permissions and Users
- Networking Basics

Phase 2 - Version Control and CI/CD:
- Git Advanced (Branching, Merging)
- GitHub Actions
- Jenkins Basics
- CI/CD Pipeline Design

Phase 3 - Containers:
- Docker Fundamentals
- Docker Compose
- Container Networking
- Image Optimization

Phase 4 - Cloud (AWS):
- AWS Core Services (EC2, S3, VPC)
- IAM and Security
- RDS and DynamoDB
- Lambda and Serverless

Phase 5 - Orchestration:
- Kubernetes Basics
- Kubernetes Deployments and Services
- Helm Charts
- Monitoring (Prometheus, Grafana)
`,
}
const generateLearningPath = async ({ goal, targetWeeks, hoursPerDay }) => {
     // get the roadmap structure for this goal
  const roadmapStructure = goalRoadmaps[goal] || ""

 const prompt = `
You are an expert learning path generator.

Generate a complete and relevant learning path for:

Goal: ${goal}
Duration: ${targetWeeks} weeks
Hours per day: ${hoursPerDay} hours

${roadmapStructure ? `FOLLOW THIS EXACT TOPIC ORDER:\n${roadmapStructure}` : ""}

STRICT RULES:
1. Return ONLY a valid JSON array. No explanation. No markdown. No code blocks. No extra text.
2. Only include topics that are genuinely relevant to "${goal}".
3. Do NOT add filler topics like "Final Project", "Behavioral Interview", "Review" just to fill weeks.
4. Group topics by week naturally — a week should have as many topics as makes sense, not forced to 7.
5. Topics must go from beginner to advanced in logical order.
6. Each topic must have 2 real working links from YouTube, MDN, freeCodeCamp, official docs, or javascript.info.
7. Start response directly with [ and end with ].

Return ONLY this structure:
[
  {
    "weekNumber": 1,
    "topics": [
      {
        "title": "topic name",
        "links": [
          { "url": "https://...", "source": "YouTube" },
          { "url": "https://...", "source": "MDN" }
        ]
      }
    ]
  }
]

Important: Only generate topics that are truly necessary to learn ${goal}. Quality over quantity.
`

  const response = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a learning path generator. Only respond with valid complete JSON arrays. Never include markdown, code blocks, backticks, or explanations. Start directly with [ and end with ]. Only include genuinely relevant topics for the given goal.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    // lower temperature = more focused
    // less random filler topics
    max_tokens: 8000,
  })

  const rawResponse = response.choices[0].message.content.trim()

  // clean accidental markdown
  const cleanedResponse = rawResponse
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim()

  // parse
  let weeks
  try {
    weeks = JSON.parse(cleanedResponse)
  } catch (parseError) {
    console.error("PARSE ERROR:", cleanedResponse)
    throw new Error("Failed to parse response. Please try again.")
  }

  if (!Array.isArray(weeks)) {
    throw new Error("Invalid response format. Please try again.")
  }

  // flatten weeks into topics array
  const topics = []

  weeks.forEach((week) => {
    if (!Array.isArray(week.topics)) return

    week.topics.forEach((topic, topicIndex) => {
      // skip if topic has no title
      if (!topic.title || !topic.title.trim()) return

      // skip obvious filler topics
      const fillerKeywords = [
        "final project",
        "behavioral",
        "review session",
        "wrap up",
        "course review",
        "general review",
      ]

      const isFiller = fillerKeywords.some((keyword) =>
        topic.title.toLowerCase().includes(keyword)
      )

      if (isFiller) return

      topics.push({
        title: topic.title,
        weekNumber: week.weekNumber,
        dayNumber: topicIndex + 1,
        links: topic.links
          .filter((link) => link.url && link.url.startsWith("http"))
          // filter out any invalid links
          .map((link) => ({
            url: link.url,
            source: link.source || "Resource",
          })),
      })
    })
  })

  if (topics.length === 0) {
    throw new Error("No valid topics generated. Please try again.")
  }

  return topics
}


export {
    generateLearningPath
}
