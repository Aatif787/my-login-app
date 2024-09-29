// src/authService.js

export const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        resolve({ username, token: "mock-token-123" });
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000); // Simulate API response delay
  });
};
