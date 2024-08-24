/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import React-Toastify
import "react-toastify/dist/ReactToastify.css"; // Import React-Toastify CSS

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists and navigate to homepage if logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homepage");
    }
  }, [navigate]);

  async function userCheck(e) {
    e.preventDefault();
    setIsSubmitting(true); // Disable submit button

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        toast.success("Signin successful! Redirecting to homepage...");
        setTimeout(() => {
          navigate("/homepage");
        }, 1000); // Delay navigation for toast to show
      } else {
        toast.error(result.message || "Signin failed!");
      }
    } catch (error) {
      toast.error("An error occurred during signin.");
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
          Sign In
        </h1>
        <form onSubmit={userCheck}>
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // Disable button during submission
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: isSubmitting ? "#ccc" : "#007BFF", // Change color when disabled
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
}

export default Signin;
