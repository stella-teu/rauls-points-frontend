import api from "./apiConfig";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/register/", credentials);
    console.log(resp);
    localStorage.setItem("token", resp.data.access);
    return resp.data.profile;
  } catch (error) {
    console.log(error)  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.profile;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resp = await api.post("/token/refresh/");
    localStorage.setItem("token", resp.data.access);
    return resp.data.profile;
  }
  return null;
};
