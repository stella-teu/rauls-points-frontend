import api from "./apiConfig";

export const getUsers = async(cohortName) => {
  try {
    if (cohortName) {
      const response = await api.get(`/profiles/?cohort=${cohortName}&leaderboard=true`)
      return response.data;
    } else {
      const response = await api.get("/profiles/?leaderboard=true")
      return response.data;
    }
  } catch (error) {
    console.error(error)
  }
}