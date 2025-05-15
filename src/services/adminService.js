import api from "./apiConfig";

export const getAllUsers = async () => {
  try {
    const res = await api.get("/profiles/");
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

export const givePointsToUser = async (profileId, pointData) => {
  try {
    const res = await api.post(`/profiles/${profileId}/points/`, pointData);
    return res.data;
  } catch (error) {
    console.error(`Error giving points to user ${profileId}:`, error.response?.data || error.message);
    throw error;
  }
};