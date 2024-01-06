import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [service, setService] = useState([]);
  const authorization_token = `Bearer ${token}`; 

  const storeTokenInLS = (server_token) => {
    setToken(server_token);
    return localStorage.setItem("token", server_token);
  };
  let isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  // JWT Authentication - To get the currently logged in user data
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
            Authorization: authorization_token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.msg);
      }
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };
    // to fetch services data from the database
    const getServices = async() =>{
      try{

        const response = await fetch(`http://localhost:3000/api/data/service`,{
          method : "GET"
        });
        if(response.ok){
          const data = await response.json();
          setService(data);
        }
      }catch(err){
        console.log(err);
      }
    }
  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, service, authorization_token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
