import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // Set token to Axios so refresh works
      API.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setInitialized(true);
  }, []);

  const login = (data) => {
    setUser(data);

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    //Attach token to axios
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete API.defaults.headers.common["Authorization"];
  };

  // prevent app rendering before user is restored
  if (!initialized) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
