import { useState, useEffect } from "react";

function AppBar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const user = payload.username.split("@")[0]; // Extract username before '@'
      setUsername(user);
      setIsSignedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    setUsername("");
    window.location.href = "/signin"; // Redirect to login page
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "8vh",
        backgroundColor: "#007BFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        color: "white",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        Courses
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {isSignedIn ? (
          <>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {username}
            </span>
            <button
              style={{
                backgroundColor: "white",
                color: "#007BFF",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
                height: "40px",
                lineHeight: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                backgroundColor: "white",
                color: "#007BFF",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
                height: "40px",
                lineHeight: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                window.location.href = "/signin";
              }}
            >
              Sign In
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "#007BFF",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
                height: "40px",
                lineHeight: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AppBar;
