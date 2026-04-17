const weekProgress = (weekTopics, completedTopicIds) => {
  if (!weekTopics || weekTopics.length === 0) {
    return { total: 0, completed: 0, percentage: 0 }
  }

  if (!completedTopicIds || completedTopicIds.length === 0) {
    return { total: weekTopics.length, completed: 0, percentage: 0 }
  }

  const total = weekTopics.length

  const completed = weekTopics.filter((topic) =>
    completedTopicIds.includes(topic._id)
  ).length

  const percentage = Math.round((completed / total) * 100)

  return { total, completed, percentage }
}

export default weekProgress