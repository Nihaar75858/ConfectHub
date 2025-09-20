// import { render, screen, fireEvent } from "@testing/library";
// import LoginForm from "/LoginForm";

// test("User should add their email and password which are cross-verfied and then logged in", async () => {
//   render(<LoginForm />);

//   fireEvent.change(screen.getByPlaceholderText(/Email/), {
//     target: { value: "testuser@example.com" },
//   });
//   fireEvent.change(screen.getByPlaceholderText(/Password/), {
//     target: { value: "secret123" },
//   });
//   fireEvent.click(screen.getByText(/Login/));

//   const message = await screen.findByText(/Login successful/);
//   expect(message).toBeInTheDocument();
// });

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
        alert("Login successful")
      } else {
        setMessage("Login failed", data.message);
        alert("Login failed")
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border rounded-md"
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
    </>
  );
}
