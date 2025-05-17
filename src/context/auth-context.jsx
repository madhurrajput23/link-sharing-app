import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll just check if the email and password are not empty
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create a mock user
    const newUser = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0], // Use part of email as name
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const register = (email, password, name) => {
    // In a real app, you would register the user in a backend
    // For demo purposes, we'll just check if the email and password are not empty
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create a new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name: name || email.split("@")[0], // Use provided name or part of email
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
