import { useEffect } from "react"
import usePathStore from "../../store/usePathStore"
import TopicItem from "./TopicItem"
import weekProgress from "../../utils/weekProgress"

const BottomSheet = ({
  groupedWeeks,
  pathId,
  completedTopicIds,
  onTick,
  onUntick,
}) => {
  const isBottomSheetOpen = usePathStore((state) => state.isBottomSheetOpen)
  const selectedWeek = usePathStore((state) => state.selectedWeek)
  const closeBottomSheet = usePathStore((state) => state.closeBottomSheet)

  // get topics for selected week
  const weekTopics = selectedWeek ? (groupedWeeks[selectedWeek] || []) : []

  // calculate week progress
  const { total, completed, percentage } = weekProgress(weekTopics, completedTopicIds)

  // close on escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeBottomSheet()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  // prevent body scroll when sheet is open
  useEffect(() => {
    if (isBottomSheetOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isBottomSheetOpen])

  return (
    <>
      {/* backdrop */}
      <div
        onClick={closeBottomSheet}
        className={`
          fixed inset-0 z-40
          bg-black/40 dark:bg-black/60
          backdrop-blur-sm
          transition-opacity duration-300
          ${isBottomSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* sheet panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 z-50
        h-[60vh]
        bg-white dark:bg-zinc-900
        border-t border-zinc-200 dark:border-zinc-800
        rounded-t-3xl
        shadow-2xl shadow-zinc-300/30 dark:shadow-zinc-900/80
        transform transition-transform duration-400 ease-out
        flex flex-col
        ${isBottomSheetOpen ? "translate-y-0" : "translate-y-full"}
      `}>

        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>

        {/* header */}
        <div className="
          flex items-center justify-between
          px-5 py-3
          border-b border-zinc-100 dark:border-zinc-800
          flex-shrink-0
        ">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Week {selectedWeek}
              </h2>
              <span className="
                text-xs px-2 py-0.5 rounded-full font-medium
                bg-blue-50 dark:bg-blue-500/10
                text-blue-600 dark:text-blue-400
                border border-blue-200 dark:border-blue-500/20
              ">
                {total} topics
              </span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {completed}/{total} completed · {percentage}%
            </p>
          </div>

          {/* close button */}
          <button
            onClick={closeBottomSheet}
            className="
              w-8 h-8 rounded-lg
              flex items-center justify-center
              bg-zinc-100 dark:bg-zinc-800
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              hover:text-zinc-900 dark:hover:text-white
              transition-colors duration-200
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* progress bar */}
        <div className="px-5 py-2 flex-shrink-0">
          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${percentage === 100 ? "bg-green-500" : "bg-blue-500"}
              `}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* topics list — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {weekTopics.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-zinc-400 dark:text-zinc-500 text-sm">
                No topics for this week.
              </p>
            </div>
          ) : (
            weekTopics
              .sort((a, b) => a.dayNumber - b.dayNumber)
              // sort by day number inside week
              .map((topic) => (
                <TopicItem
                  key={topic._id}
                  topic={topic}
                  pathId={pathId}
                  isCompleted={completedTopicIds.includes(topic._id)}
                  onTick={onTick}
                  onUntick={onUntick}
                />
              ))
          )}

          {/* bottom padding so last item not hidden */}
          <div className="h-4" />
        </div>

      </div>
    </>
  )
}

export default BottomSheet