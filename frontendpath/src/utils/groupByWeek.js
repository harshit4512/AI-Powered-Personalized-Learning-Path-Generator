const groupByWeek = (topics) => {
  if (!topics || topics.length === 0) return {}

  return topics.reduce((acc, topic) => {
    const week = topic.weekNumber

    if (!acc[week]) {
      acc[week] = []
    }

    acc[week].push(topic)

    return acc
  }, {})
  // returns:
  // {
  //   1: [topic1, topic2, topic3],
  //   2: [topic4, topic5],
  //   3: [topic6, topic7]
  // }
}

export default groupByWeek


// "Reduce starts with an initial accumulator value, here an empty object. For each topic, we extract its weekNumber and check if that key exists in the accumulator. If not, we initialize it as an empty array. Then we push the topic into that array. Finally, we return the accumulator, which is passed to the next iteration."