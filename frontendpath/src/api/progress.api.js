import api from "./axios"

export const tickTopic = async (topicId, pathId) => {
  const response = await api.post(
    `/progress/tick/${topicId}`,
    { pathId }
  )
  return response.data
}

export const untickTopic = async (topicId, pathId) => {
  const response = await api.delete(
    `/progress/untick/${topicId}`,
    { data: { pathId } }
    // axios delete with body needs
    // data wrapped inside { data: {} }
  )
  return response.data
}

export const getCompletedTopics = async (pathId) => {
  const response = await api.get(`/progress/${pathId}`)
  return response.data
}

export const getPathStats = async (pathId) => {
  const response = await api.get(`/progress/stats/${pathId}`)
  return response.data
}