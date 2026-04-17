import WeekCard from "./WeekCard"

const WeekCardList = ({ groupedWeeks, completedTopicIds }) => {

  const weekNumbers = Object.keys(groupedWeeks)
    .map(Number)
    .sort((a, b) => a - b)
  // sort weeks in ascending order
  // 1, 2, 3... not random order

  if (weekNumbers.length === 0) {
    return (
      <div className="
        flex items-center justify-center
        py-16 text-center
      ">
        <p className="text-zinc-400 dark:text-zinc-500 text-sm">
          No topics found in this path.
        </p>
      </div>
    )
  }

  return (
    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4
    ">
      {weekNumbers.map((weekNumber) => (
          
        <WeekCard
          key={weekNumber}
          weekNumber={weekNumber}
          topics={groupedWeeks[weekNumber]}
          completedTopicIds={completedTopicIds}
        />
      )
      )}
      
    </div>
  )
}

export default WeekCardList