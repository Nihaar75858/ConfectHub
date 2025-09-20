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
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
}
