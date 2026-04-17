import api from "./axios"

export const createAssessment = async (data) => {
  const response = await api.post("/assessment/create", data)
  return response.data
}

export const getAssessment = async (id) => {
  const response = await api.get(`/assessment/${id}`)
  return response.data
}

export const getAllAssessments = async () => {
  const response = await api.get("/assessment/all")
  return response.data
}

export const deleteAssessment = async (id) => {
  const response = await api.delete(`/assessment/${id}`)
  return response.data
}