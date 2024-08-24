/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homepage");
    }
  }, [navigate]);

  async function createHashRouter(e) {
    e.preventDefault();
    setIsSubmitting(true); // Disable submit button

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:username, password:password }),
      });

      const result = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", result.token);
        toast.success("Signup successful! Redirecting to homepage...");
        setTimeout(() => {
          navigate("/homepage");
          window.location.reload();
        }, 1000); // Delay navigation for toast to show
      } else {
        if (result.message === "User already exists") {
          toast.warn("User already signed up. Please log in.");
        } else {
          toast.error(result.message || "Signup failed!");
        }
      }
    } catch (error) {
      toast.error("An error occurred during signup.");
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#333",
          }}
        >
          Sign Up
        </h1>
        <form onSubmit={createHashRouter}>
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label
              htmlFor="username"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#555",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // Disable button during submission
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* React-Toastify Container */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Signup;
