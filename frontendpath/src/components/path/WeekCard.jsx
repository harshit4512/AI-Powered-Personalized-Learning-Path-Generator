import usePathStore from "../../store/usePathStore"
import weekProgress from "../../utils/weekProgress"

const WeekCard = ({ weekNumber, topics, completedTopicIds }) => {
  const openWeek = usePathStore((state) => state.openWeek)
  const selectedWeek = usePathStore((state) => state.selectedWeek)

  const { total, completed, percentage } = weekProgress(topics, completedTopicIds)
  const isSelected = selectedWeek === weekNumber
  const isComplete = percentage === 100

  return (
    <div
      onClick={() => openWeek(weekNumber)}
      className={`
        group cursor-pointer
        rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        hover:border-blue-300 dark:hover:border-blue-500/40
        hover:shadow-md hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        transition-all duration-300
        overflow-hidden
        flex
        ${isSelected
          ? "border-blue-400 dark:border-blue-500/60 shadow-md shadow-blue-100/50 dark:shadow-blue-900/30"
          : ""
        }
      `}
    >
      {/* colored left border */}
      <div className={`
        w-1 flex-shrink-0
        transition-colors duration-300
        ${isComplete
          ? "bg-green-500"
          : isSelected
            ? "bg-blue-500"
            : "bg-zinc-200 dark:bg-zinc-700 group-hover:bg-blue-400"
        }
      `} />

      <div className="flex-1 p-4 space-y-3">

        {/* header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="
                text-xs font-semibold
                text-blue-500 dark:text-blue-400
                uppercase tracking-wider
              ">
                Week {weekNumber}
              </span>
              {isComplete && (
                <span className="
                  flex items-center gap-1
                  text-xs font-medium
                  text-green-500 dark:text-green-400
                ">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Done
                </span>
              )}
            </div>
            <p className="
              text-sm font-semibold
              text-zinc-900 dark:text-white
            ">
              {total} topic{total !== 1 ? "s" : ""}
            </p>
          </div>

          {/* percentage + open icon */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`
              text-sm font-bold
              ${isComplete
                ? "text-green-500 dark:text-green-400"
                : "text-zinc-600 dark:text-zinc-400"
              }
            `}>
              {percentage}%
            </span>
            <div className={`
              w-7 h-7 rounded-lg flex items-center justify-center
              transition-all duration-200
              ${isSelected
                ? "bg-blue-500 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:text-blue-500 dark:group-hover:text-blue-400"
              }
            `}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* progress bar */}
        <div className="space-y-1.5">
          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${isComplete ? "bg-green-500" : "bg-blue-500"}
              `}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            {completed}/{total} completed
          </p>
        </div>

      </div>
    </div>
  )
}

export default WeekCard