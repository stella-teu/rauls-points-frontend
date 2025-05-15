import api from "./apiConfig";

export const getUsers = async () => {
  const response = await api.get("/profiles/?cohort=seb224&leaderboard=true");
  return response.data;
};