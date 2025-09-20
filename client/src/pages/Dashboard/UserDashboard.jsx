// import { render, screen, fireEvent } from "@testing/library";
// import UserDashboard from "./UserDashboard";
// import UserData from "./UserData";
// import Sweets from './Sweet';
// import SweetSearch from "./SweetSearch";
// import PurchaseSweet from "./PurchaseSweet";

// test("User Dashboard shows the authenticated users their data", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           name: "John Doe",
//           email: "user@example.com",
//         }),
//     })
//   );

//   render(<UserData />);

//   expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
//   expect(await screen.findByText(/user@example.com/i)).toBeInTheDocument();
// });

// test("Users should be able to view all sweets in the inventory", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           sweets: [{ name: "Peda", category: "Indian", price: 50, quantity: 100 }]
//         }),
//     })
//   );

//   render(<Sweets />);

//   expect(await screen.findByText(/peda/i)).toBeInTheDocument();
//   expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
//   expect(await screen.findByText(/50/i)).toBeInTheDocument();
//   expect(await screen.findByText(/100/i)).toBeInTheDocument();
// });

// test("Users should be able to search and filter sweets", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(
//         { name: "Peda", category: "Indian", price: 50 },
//         { name: "Donut", category: "Western", price: 100 }),
//     })
//   );

//   render(<SweetSearch />);

//   fireEvent.change(screen.getByPlaceholderText("search"), { target: { value: "Peda" } });
//   fireEvent.change(screen.getByPlaceholderText("filter"), { target: { value: "Peda" } });
//   fireEvent.change(screen.getByPlaceholderText("filter"), { target: { value: "Indian" } });
//   fireEvent.change(screen.getByPlaceholderText("filter"), { target: { value: 50 } });

//   expect(await screen.findByText(/Peda/i)).toBeInTheDocument();
//   expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
//   expect(await screen.findByText(/50/i)).toBeInTheDocument();
//   expect(screen.findByText(/Donut/i)).tobeNull();
// });

// test("Users should be able to press the 'Purchase' button and buy sweets", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(
//         { name: "Peda", category: "Indian", price: 50, quantity: 100 },
//         { name: "Donut", category: "Western", price: 100, quantity: 0  }),
//     })
//   );

//   if(quantity == 0) purchase = false;

//   render(<PurchaseSweet />);

//   fireEvent.change(purchase, { target: { value: quantity - bought_quantity } });

//   expect(await screen.findByText(/purchase/i)).toBeInTheDocument();
// });

import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem("access_token");
    console.log("Found token in function", token);

    if (!token) {
      throw new Error("No access token found. Please login again.");
    }

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      console.log("Has it reached here?");
      throw new Error("Session expired. Please login again.");
    }

    console.log("Has it passed the if statement here?");

    if (!response.ok) {
      console.log("Gone inside here");
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Response is brought:", response.json);
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        console.log("Access Token:", localStorage.getItem("access_token"));
        console.log("Refresh Token:", localStorage.getItem("refresh_token"));

        // Check if user is logged in
        const token = localStorage.getItem("access_token");
        // if (!token) {
        //   window.location.href = "/login";
        //   return;
        // }

        console.log("Found token:", token);

        // Fetch sweets data
        const sweetsData = await makeAuthenticatedRequest(
          "http://localhost:8000/api/sweets/"
        );
        console.log("Sweets data:", sweetsData);

        if (sweetsData.sweets && Array.isArray(sweetsData.sweets)) {
          setSweets(sweetsData.sweets);
          setFilteredSweets(sweetsData.sweets);
        } else {
          setSweets([]);
          setFilteredSweets([]);
        }

        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filtered sweets when search or filter changes
  useEffect(() => {
    const filtered = sweets.filter((sweet) => {
      const matchesSearch = sweet.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        !filter ||
        sweet.category.toLowerCase().includes(filter.toLowerCase()) ||
        sweet.price.toString().includes(filter);

      return matchesSearch && matchesFilter;
    });

    setFilteredSweets(filtered);
  }, [search, filter, sweets]);

  const handleSearch = async () => {
    if (!search && !filter) {
      setFilteredSweets(sweets);
      return;
    }

    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("name", search);
      if (filter) {
        if (isNaN(filter)) {
          queryParams.append("category", filter);
        } else {
          queryParams.append("min_price", filter);
          queryParams.append("max_price", filter);
        }
      }

      const searchData = await makeAuthenticatedRequest(
        `http://localhost:8000/api/sweets/search/?${queryParams.toString()}`
      );

      if (searchData.sweets && Array.isArray(searchData.sweets)) {
        setFilteredSweets(searchData.sweets);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
    }
  };

  const handlePurchase = async (sweetId, index) => {
    try {
      sweetId += 1
      const purchaseData = await makeAuthenticatedRequest(
        `http://localhost:8000/api/sweets/${sweetId}/purchase/`,
        {
          method: "POST",
          body: JSON.stringify({ quantity: 1 }),
        }
      );

      console.log("Purchase successful:", purchaseData);

      setSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === sweetId
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );

      setFilteredSweets((prev) =>
        prev.map((sweet) =>
          sweet.id === sweetId
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );

      alert(`Successfully purchased ${purchaseData.sweet}!`);
    } catch (error) {
      console.error("Purchase error:", error);
      alert(`Purchase failed: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
        <button onClick={handleLogout}>Back to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>

      <section>
        <h2>Search & Filter</h2>
        <input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          placeholder="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </section>

      <section>
        <h2>Sweets</h2>
        {filteredSweets.map((s, idx) => (
          <div key={idx}>
            <p>
              {s.name} - {s.category} - {s.price} - {s.quantity}
            </p>
            <button
              onClick={() => handlePurchase(idx)}
              disabled={s.quantity === 0}
            >
              Purchase
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
