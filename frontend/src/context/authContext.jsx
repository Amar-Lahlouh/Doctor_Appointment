import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";

export const authContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [role, setrole] = useState(true);
  const login = async (data) => {
    console.log(data);
    const res = await axios.post(`${BASE_URL}/auth/login`, data, {
      withCredentials: true,
    });
    console.log("afterrrrrrrrrr");
    const user = res.data?.data;
    if (user.role == "patient") {
      window.location.href = "/";
    } else if (user.role == "doctor") {
      window.location.href = "/doctors/profile/me";
    } else {
      console.log("Invalid");
    }
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (res.data.valid) {
          // check role from refresh response if available
          let userRes;

          if (res.data.role === "doctor") {
            userRes = await axios.get(
              `${BASE_URL}/doctors/${res.data.userId}`,
              {
                withCredentials: true,
              }
            );
          } else {
            userRes = await axios.get(`${BASE_URL}/users/getme`, {
              withCredentials: true,
            });
          }

          setCurrentUser({ user: userRes.data });
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("refresh error", err);
        setCurrentUser(null);
      } finally {
        setLoading(false); // ✅ done loading
      }
    };

    if (!currentUser) refresh();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    window.location.href = "/";
  };
  return (
    <authContext.Provider
      value={{ currentUser, setCurrentUser, login, logout, Loading }}
    >
      {children}
    </authContext.Provider>
  );
};
