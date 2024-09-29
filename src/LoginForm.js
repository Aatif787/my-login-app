import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "./authService";
import './LoginForm.css';

export default function LoginForm() {
  // Inside LoginForm component
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("mouseover", () => {
      loginBtn.classList.add("animate-pulse");
    });
    loginBtn.addEventListener("mouseout", () => {
      loginBtn.classList.remove("animate-pulse");
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (username === "" || password === "") {
      setErrorMessage("Both fields are required.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await authenticateUser(username, password);
      console.log("Login successful", response);
      setErrorMessage("");
      // Save token to local storage
    localStorage.setItem("token", response.token);
      // Redirect to dashboard or perform other actions on successful login
      // After successful login
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
      <form className="bg-card shadow-lg rounded-lg p-8 mb-4 border border-primary" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-primary">Welcome Back!</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-secondary" htmlFor="username">Username</label>
          <input
            className="shadow appearance-none border border-muted rounded w-full py-2 px-3 text-input leading-tight focus:outline-none focus:ring focus:ring-ring focus:border-primary"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-secondary" htmlFor="password">Password</label>
          <input
            className="shadow appearance-none border border-muted rounded w-full py-2 px-3 text-input mb-3 leading-tight focus:outline-none focus:ring focus:ring-ring focus:border-primary"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {errorMessage && (
          <p className="text-destructive-foreground mb-4">{errorMessage}</p>
        )}
        <div className="flex items-center justify-between">
          <button
            id="loginBtn"
            className="bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring focus:ring-ring rounded px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}




