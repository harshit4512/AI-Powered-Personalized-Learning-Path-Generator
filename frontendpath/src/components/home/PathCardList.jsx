import PathCard from "./PathCard"

const PathCardList = ({ paths }) => {

  if (!paths || paths.length === 0) {
    return null
    // empty state handled in HomePage
  }

  // separate by status
  const active = paths.filter((p) => p.status === "active")
  const completed = paths.filter((p) => p.status === "completed")
  const archived = paths.filter((p) => p.status === "archived")

  const Section = ({ title, items }) => {
    if (!items || items.length === 0) return null
    return (
      <div className="space-y-4">
        <h2 className="
          text-sm font-semibold
          text-zinc-500 dark:text-zinc-400
          uppercase tracking-wider
        ">
          {title}
        </h2>
        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
        ">
          {items.map((path) => (
            <PathCard key={path._id} path={path} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <Section title="Active" items={active} />
      <Section title="Completed" items={completed} />
      <Section title="Archived" items={archived} />
    </div>
  )
}

export default PathCardList