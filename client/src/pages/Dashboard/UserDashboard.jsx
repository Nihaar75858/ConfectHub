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
      sweetId += 1;
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
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center mb-8 text-black">
        Welcome to your Dashboard
      </h1>

      <section className="mb-8 bg-white p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Search & Filter
        </h2>
        <div className="flex gap-4">
          <input
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </section>

      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold text-pink-700 mb-4">Sweets</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSweets.map((s, idx) => (
            <div
              key={idx}
              className="rounded-xl shadow-lg overflow-hidden bg-white flex flex-col"
            >
              <div className="h-40 w-full bg-yellow-500 flex items-center justify-center">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold"></span>
                )}
              </div>

              <div className="flex flex-col justify-between flex-1 p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.category}</p>
                  <p className="text-sm text-gray-700">₹{s.price}</p>
                  <p className="text-sm text-gray-700">Qty: {s.quantity}</p>
                </div>

                <button
                  onClick={() => handlePurchase(idx)}
                  disabled={s.quantity === 0}
                  className={`w-full px-4 py-2 rounded-md font-semibold text-white transition ${
                    s.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-600"
                  }`}
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
