import { useNavigate } from "react-router-dom"

// goal accent colors
const goalColors = {
  "Full Stack Development": {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-500",
    icon: "bg-blue-500",
  },
  "DSA & Competitive Programming": {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-500/20",
    text: "text-violet-600 dark:text-violet-400",
    bar: "bg-violet-500",
    icon: "bg-violet-500",
  },
  "Data Science": {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
    icon: "bg-emerald-500",
  },
  "Android Development": {
    bg: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-200 dark:border-green-500/20",
    text: "text-green-600 dark:text-green-400",
    bar: "bg-green-500",
    icon: "bg-green-500",
  },
  "DevOps & Cloud": {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    bar: "bg-orange-500",
    icon: "bg-orange-500",
  },
}

// status badge
const statusConfig = {
  active: {
    label: "Active",
    class: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20",
  },
  completed: {
    label: "Completed",
    class: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20",
  },
  archived: {
    label: "Archived",
    class: "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700",
  },
}

const PathCard = ({ path }) => {
  const navigate = useNavigate()
  const colors = goalColors[path.goal] || goalColors["Full Stack Development"]
  const status = statusConfig[path.status] || statusConfig.active

  return (
    <div
      onClick={() => navigate(`/path/${path._id}`)}
      className="
        group cursor-pointer
        rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        hover:border-zinc-300 dark:hover:border-zinc-700
        hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        transition-all duration-300
        overflow-hidden
        flex flex-col
      "
    >
      {/* colored top accent bar */}
      <div className={`h-1 w-full ${colors.bar}`} />

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* header — goal + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* goal icon */}
            <div className={`
              w-9 h-9 rounded-xl flex-shrink-0
              ${colors.icon}
              flex items-center justify-center
            `}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <h3 className="
                font-semibold text-sm
                text-zinc-900 dark:text-white
                leading-snug
                group-hover:text-blue-600 dark:group-hover:text-blue-400
                transition-colors duration-200
              ">
                {path.goal}
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                {path.targetWeeks} weeks • {path.hoursPerDay}h/day
              </p>
            </div>
          </div>

          {/* status badge */}
          <span className={`
            flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium
            ${status.class}
          `}>
            {status.label}
          </span>
        </div>

        {/* progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Progress
            </span>
            <span className={`text-xs font-semibold ${colors.text}`}>
              {path.progressPercentage}%
            </span>
          </div>

          {/* progress bar */}
          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
              style={{ width: `${path.progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {path.completedTopics}/{path.totalTopics} topics done
            </span>
            {path.progressPercentage === 100 && (
              <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Complete
              </span>
            )}
          </div>
        </div>

        {/* footer — open button */}
        <div className="
          flex items-center justify-between
          pt-2 mt-auto
          border-t border-zinc-100 dark:border-zinc-800
        ">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {new Date(path.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          <span className="
            flex items-center gap-1
            text-xs font-medium
            text-zinc-500 dark:text-zinc-400
            group-hover:text-blue-500 dark:group-hover:text-blue-400
            transition-colors duration-200
          ">
            Open
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PathCard