// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNavigationConfig } from "../constants/utils";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);

  const decodeJWT = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("access_token");
    const tokenPayload = decodeJWT(storedRole);
    const userRole = tokenPayload?.role || "user";

    console.log(userRole);

    const roleMap = {
      admin: 1,
      user: 2,
      guest: 0,
    };

    // Get navigation items based on role
    setMenuItems(getNavigationConfig(roleMap[userRole]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role"); // optional, clear role as well
    window.location.href = "/login";
  };

  return (
    <nav className="bg-amber-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="w-64 h-auto" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:text-gray-200">
              {item.name === "Logout" ? (
                <button onClick={handleLogout} className="focus:outline-none">
                  {item.name}
                </button>
              ) : (
                <Link to={item.to}>{item.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
