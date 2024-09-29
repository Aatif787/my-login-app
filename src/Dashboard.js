// src/Dashboard.js

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and navigate back to login
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center"></div>
        <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
        <button
          className="bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring focus:ring-ring rounded px-4 py-2 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
    </div>
  );
}
