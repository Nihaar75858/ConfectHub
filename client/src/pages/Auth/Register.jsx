import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
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

    const response = await fetch("http://localhost:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Registration successful");
      console.log("Data sent")
    } else {
      setMessage("Registration failed", data.message);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
        >
          <h2>Register</h2>

          <label>
            First Name
            <input
              type="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name
            <input
              type="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="confirmPassword"
              name="confirmPassword"
              required
            />
          </label>

          <button
            type="submit"
          >
            Register
          </button>
        </form>

        {message && (
          <p>
            {message}
          </p>
        )}
      </div>
    </>
  );
}
