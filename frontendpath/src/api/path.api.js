import api from "./axios"

export const generatePath = async (assessmentId) => {
  const response = await api.post("/path/generate/",{assessmentId})
  return response.data
}

export const getAllPaths = async () => {
  const response = await api.get("/path/all")
  return response.data
}

export const getPath = async (pathId) => {
  const response = await api.get(`/path/${pathId}`)
  return response.data
}

export const updatePathStatus = async (pathId, status) => {
  const response = await api.patch(
    `/path/${pathId}/status`,
    { status }
  )
  return response.data
}

export const deletePath = async (pathId) => {
  const response = await api.delete(`/path/${pathId}`)
  return response.data
}