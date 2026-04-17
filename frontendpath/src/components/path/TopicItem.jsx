import { useState } from "react"
import { tickTopic, untickTopic } from "../../api/progress.api"

const sourceColors = {
  YouTube: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20",
  MDN: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20",
  freeCodeCamp: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20",
  GeeksforGeeks: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  "javascript.info": "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
  "React Docs": "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20",
  "Official Docs": "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
}

const TopicItem = ({
  topic,
  pathId,
  isCompleted,
  onTick,
  onUntick,
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

 
  const handleToggle = async () => {
  if (isUpdating) return
  setIsUpdating(true)

  try {
    if (isCompleted) {
      onUntick(topic._id)   // ✅ ONLY THIS
    } else {
      onTick(topic._id)     // ✅ ONLY THIS
    }
  } catch (err) {
    console.error("Failed to update topic:", err)
  } finally {
    setIsUpdating(false)
  }
}

  return (
    <div className={`
      flex flex-col gap-2.5
      p-4 rounded-xl
      border transition-all duration-200
      ${isCompleted
        ? "bg-green-50/50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20"
        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      }
    `}>

      {/* row 1 — checkbox + title */}
      <div className="flex items-start gap-3">

        {/* custom checkbox */}
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`
            flex-shrink-0 mt-0.5
            w-5 h-5 rounded-md border-2
            flex items-center justify-center
            transition-all duration-200
            ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${isCompleted
              ? "bg-green-500 border-green-500 dark:bg-green-500 dark:border-green-500"
              : "border-zinc-300 dark:border-zinc-600 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-zinc-900"
            }
          `}
        >
          {isUpdating ? (
            <div className="w-3 h-3 rounded-full border border-white/50 border-t-white animate-spin" />
          ) : isCompleted ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5"
                stroke="white" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </button>

        {/* topic title */}
        <p className={`
          text-sm font-medium leading-snug
          transition-colors duration-200
          ${isCompleted
            ? "text-zinc-400 dark:text-zinc-500 line-through"
            : "text-zinc-800 dark:text-zinc-200"
          }
        `}>
          {topic.title}
        </p>
      </div>

      {/* row 2 — links */}
      {topic.links && topic.links.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-8">
          {topic.links.map((link, index) => {
            const colorClass = sourceColors[link.source] || sourceColors.default
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`
                  flex items-center gap-1.5
                  px-2.5 py-1
                  rounded-full
                  border text-xs font-medium
                  transition-opacity duration-200
                  hover:opacity-80
                  ${colorClass}
                `}
              >
                {/* link icon */}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {link.source}
              </a>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default TopicItem