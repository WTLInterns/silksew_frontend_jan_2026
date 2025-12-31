// // eslint-disable-next-line no-unused-vars
// import React, { createContext, useState, useContext, useEffect } from "react";
// import { ShopContext } from "./ShopContext";
// // Create the AuthContext
// const AuthContext = createContext();


// // AuthContextProvider component
// const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Initialize user from localStorage if available
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [token, setToken] = useState(() => {
//     // Initialize token from localStorage if available
//     return localStorage.getItem("token") || "";
//   });

//   const { setToken: setShopToken } = useContext(ShopContext);
//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     setShopToken(authToken); // Update ShopContext with new token
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken("");
//     setShopToken(""); // Clear token in ShopContext
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//       setShopToken(storedToken); // Sync token with ShopContext
//     }
//   }, [setShopToken]);

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// // Only export AuthContext and AuthContextProvider
// export { AuthContext, AuthContextProvider };



// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from "react";
import { ShopContext } from "./ShopContext";

// Create the AuthContext
const AuthContext = createContext();

// AuthContextProvider component
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const { setToken: setShopToken } = useContext(ShopContext);

  // ✅ On mount: check both storages
  useEffect(() => {
    let storedUser = JSON.parse(sessionStorage.getItem("user"));
    let storedToken = sessionStorage.getItem("token");

    if (!storedUser || !storedToken) {
      storedUser = JSON.parse(localStorage.getItem("user"));
      storedToken = localStorage.getItem("token");
    }

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setShopToken(storedToken);
    }
  }, [setShopToken]);

  // ✅ Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setShopToken(authToken);

    // Clear existing sessions
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    // ✅ Role-based session management
    if (userData.role?.toLowerCase() === "admin") {
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", authToken);
      console.log("Stored admin in sessionStorage ✅");
    } else {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
      console.log("Stored user in localStorage ✅");
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setToken("");
    setShopToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export
export { AuthContext, AuthContextProvider };


