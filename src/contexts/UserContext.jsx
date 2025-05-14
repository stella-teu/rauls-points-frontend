import { createContext, useState, useEffect } from "react";
import { verifyUserProfile } from "../services/authService";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null);

  const getUserProfileFromToken = async () => {
    const profileData = await verifyUserProfile()
    setProfile(profileData);
  };

  useEffect(() => {
    getUserProfileFromToken();
  }, []);

  const valueObject = { profile, setProfile };
  console.log("value: ", valueObject)

  return (
    <UserContext.Provider value={valueObject}>
      { children }
    </UserContext.Provider>
  );
}