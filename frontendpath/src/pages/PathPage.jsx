import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import usePathStore from "../store/usePathStore"
import Navbar from "../components/shared/Navbar"
import Sidebar from "../components/shared/Sidebar"
import WeekCardList from "../components/path/WeekCardList"
import BottomSheet from "../components/path/BottomSheet"
import Loader from "../components/shared/Loader"
import groupByWeek from "../utils/groupByWeek"
import { getPath, updatePathStatus, deletePath } from "../api/path.api"
import { getCompletedTopics,getPathStats, tickTopic, untickTopic } from "../api/progress.api"

// goal colors for accent
const goalColors = {
  "Full Stack Development": "text-blue-500 dark:text-blue-400",
  "DSA & Competitive Programming": "text-violet-500 dark:text-violet-400",
  "Data Science": "text-emerald-500 dark:text-emerald-400",
  "Android Development": "text-green-500 dark:text-green-400",
  "DevOps & Cloud": "text-orange-500 dark:text-orange-400",
}

const PathPage = () => {
  const { pathId } = useParams()
  const navigate = useNavigate()

  // NEW ADD
const [completedTopics, setCompletedTopics] = useState([]);
const [stats, setStats] = useState(null);
  // NEW ADD

  const [path, setPath] = useState(null)
  const [completedTopicIds, setCompletedTopicIds] = useState([])
  const [groupedWeeks, setGroupedWeeks] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  const setCurrentPathId = usePathStore((state) => state.setCurrentPathId)
  const clearPath = usePathStore((state) => state.clearPath)

  // console.log(groupedWeeks);

  // fetch path and progress on mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true)

  //       // fetch both in parallel
  //       const [pathData, progressData] = await Promise.all([
  //         getPath(pathId),
  //         getCompletedTopics(pathId),
  //       ])

  //       const fetchedPath = pathData.path
  //       setPath(fetchedPath)

  //       // group topics by week
  //       const grouped = groupByWeek(fetchedPath.topics)
  //       setGroupedWeeks(grouped)

  //       // store completed topic ids
  //       setCompletedTopicIds(progressData.completedTopicIds || [])

  //       // set current path in store
  //       setCurrentPathId(pathId)

  //     } catch (err) {
  //       setError("Failed to load this path. Please try again.")
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchData()

  //   // cleanup on unmount
  //   return () => clearPath()
  // }, [pathId])

  useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true)

      const [pathData, progressData, statsData] = await Promise.all([
        getPath(pathId),
        getCompletedTopics(pathId),
        getPathStats(pathId)
      ])

      const fetchedPath = pathData.path
      setPath(fetchedPath)

      const grouped = groupByWeek(fetchedPath.topics)
      setGroupedWeeks(grouped)

      setCompletedTopicIds(progressData.completedTopicsIds || [])
      setStats(statsData.stats)

      setCurrentPathId(pathId)

    } catch (err) {
      setError("Failed to load this path. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  fetchData()

  return () => clearPath()

}, [pathId])

  const handleTick = async (topicId) => {
  try {
    await tickTopic(topicId, pathId)

    setCompletedTopicIds(prev => [...prev, topicId])

    const statsRes = await getPathStats(pathId)
    setStats(statsRes.stats)

  } catch (err) {
    console.error("Tick failed")
  }
}

  
  const handleUntick = async (topicId) => {
  try {
    await untickTopic(topicId, pathId)

    setCompletedTopicIds(prev =>
      prev.filter(id => id.toString() !== topicId.toString())
    )

    const statsRes = await getPathStats(pathId)
    setStats(statsRes.stats)

  } catch (err) {
    console.error("Untick failed")
  }
}

  // archive path
  const handleArchive = async () => {
    try {
      await updatePathStatus(pathId, "archived")
      navigate("/home")
    } catch (err) {
      console.error("Failed to archive path")
    }
  }

  // delete path
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this path?")) return
    try {
      await deletePath(pathId)
      navigate("/home")
    } catch (err) {
      console.error("Failed to delete path")
    }
  }

  // calculate overall progress from current state
  const totalTopics = path?.totalTopics || 0
  // const completedCount = completedTopicIds.length
  // const progressPercentage = totalTopics > 0
  //   ? Math.round((completedCount / totalTopics) * 100)
  //   : 0
  const completedCount = stats?.completedTopics || 0
const progressPercentage = stats?.progressPercentage || 0

  const goalColor = goalColors[path?.goal] || "text-blue-500"

  if (isLoading) return <Loader />

  return (
    <div className="
      min-h-screen
      bg-zinc-50 dark:bg-zinc-950
      transition-colors duration-300
    ">
      {/* subtle background */}
      <div className="
        fixed inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-blue-50/40 via-transparent to-transparent
        dark:from-blue-950/20 dark:via-transparent dark:to-transparent
      "/>

      {/* navbar */}
      <Navbar onCreatePath={() => navigate("/onboarding")} />

      {/* sidebar */}
      <Sidebar />

      {/* main */}
      <main className="
        relative z-10
        pt-16
        px-4 sm:px-6 lg:px-8
        pb-24
        max-w-7xl mx-auto
      ">

        {/* error */}
        {error && (
          <div className="
            mt-8 p-4 rounded-xl
            bg-red-50 dark:bg-red-500/10
            border border-red-200 dark:border-red-500/20
            text-red-600 dark:text-red-400 text-sm
          ">
            {error}
          </div>
        )}

        {path && (
          <>
            {/* ================================ */}
            {/* PAGE HEADER                     */}
            {/* ================================ */}
            <div className="py-8 space-y-4">

              {/* back button */}
              <button
                onClick={() => navigate("/home")}
                className="
                  flex items-center gap-2
                  text-sm text-zinc-500 dark:text-zinc-400
                  hover:text-zinc-900 dark:hover:text-white
                  transition-colors duration-200
                "
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Home
              </button>

              {/* title row */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${goalColor}`}>
                    Learning Path
                  </p>
                  <h1 className="
                    text-2xl sm:text-3xl font-bold
                    text-zinc-900 dark:text-white
                  ">
                    {path.goal}
                  </h1>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    {path.targetWeeks} weeks · {path.hoursPerDay}h per day
                  </p>
                </div>

                {/* options menu */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="
                      w-9 h-9 rounded-lg
                      flex items-center justify-center
                      bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      text-zinc-500 dark:text-zinc-400
                      hover:bg-zinc-50 dark:hover:bg-zinc-800
                      transition-colors duration-200
                    "
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1" fill="currentColor" />
                      <circle cx="12" cy="12" r="1" fill="currentColor" />
                      <circle cx="12" cy="19" r="1" fill="currentColor" />
                    </svg>
                  </button>

                  {showOptions && (
                    <div className="
                      absolute right-0 top-full mt-2
                      w-44 rounded-xl
                      bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      shadow-lg
                      overflow-hidden z-10
                    ">
                      <div className="p-1">
                        <button
                          onClick={() => {
                            setShowOptions(false)
                            handleArchive()
                          }}
                          className="
                            w-full flex items-center gap-3
                            px-3 py-2 rounded-lg text-sm
                            text-zinc-600 dark:text-zinc-400
                            hover:bg-zinc-50 dark:hover:bg-zinc-800
                            transition-colors duration-200
                          "
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M21 8v13H3V8M23 3H1v5h22V3zM10 12h4"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Archive Path
                        </button>
                        <button
                          onClick={() => {
                            setShowOptions(false)
                            handleDelete()
                          }}
                          className="
                            w-full flex items-center gap-3
                            px-3 py-2 rounded-lg text-sm
                            text-red-500 dark:text-red-400
                            hover:bg-red-50 dark:hover:bg-red-500/10
                            transition-colors duration-200
                          "
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <polyline points="3 6 5 6 21 6"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Delete Path
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* overall progress card */}
              <div className="
                p-4 rounded-2xl
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                space-y-3
              ">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Overall Progress
                  </span>
                  <span className="text-sm font-bold text-blue-500 dark:text-blue-400">
                    {progressPercentage}%
                  </span>
                </div>

                {/* progress bar */}
                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className={`
                      h-full rounded-full transition-all duration-500
                      ${progressPercentage === 100 ? "bg-green-500" : "bg-blue-500"}
                    `}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
                  <span>{completedCount}/{totalTopics} topics completed</span>
                  {progressPercentage === 100 && (
                    <span className="text-green-500 font-medium flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor"
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Path Complete!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ================================ */}
            {/* WEEK CARDS GRID                 */}
            {/* ================================ */}
            <div className="space-y-4">
              <h2 className="
                text-sm font-semibold
                text-zinc-500 dark:text-zinc-400
                uppercase tracking-wider
              ">
                Weekly Breakdown
              </h2>

              <WeekCardList
                groupedWeeks={groupedWeeks}
                completedTopicIds={completedTopicIds}
              />
            </div>
          </>
        )}
      </main>

      {/* ================================ */}
      {/* BOTTOM SHEET                    */}
      {/* ================================ */}



      <BottomSheet
        groupedWeeks={groupedWeeks}
        pathId={pathId}
        completedTopicIds={completedTopicIds}
        onTick={handleTick}
        onUntick={handleUntick}
      />
    </div>
  )
}

export default PathPage