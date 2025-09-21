import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const decodeJWT = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful");
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        // Redirect to dashboard
        const tokenPayload = decodeJWT(data.access);
        const userRole = tokenPayload?.role || "user";

        setTimeout(() => {
          if (userRole === "admin") {
            window.location.href = "/admin/admindashboard";
          } else if (userRole === "user") {
            window.location.href = "/userdashboard";
          } else {
            window.location.href = "/"
          }
        }, 1000);
      } else {
        setMessage("Login failed", data.message);
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-1/2 flex items-center justify-center bg-amber-500">
          <img src="/logo.png" alt="Logo" className="w-64 h-auto" />
        </div>

        <div className="w-1/2 flex items-center justify-center bg-white">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl w-3/4 max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

            {message && (
              <p className="mt-3 text-center text-sm text-red-600">{message}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
