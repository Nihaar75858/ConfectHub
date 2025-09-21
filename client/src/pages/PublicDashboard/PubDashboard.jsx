import React, { useEffect, useState } from "react";

const PubDashboard = () => {
  const [sweets, setSweets] = useState([
    {
      id: 1,
      name: "Milk Chocolate Bar",
      category: "Chocolate",
      price: 100,
      quantity: 50,
      description: "Smooth and creamy milk chocolate, perfect for gifting.",
    },
    {
      id: 2,
      name: "Butter Cookies",
      category: "Biscuits",
      price: 150,
      quantity: 30,
      description: "Crunchy, buttery cookies that melt in your mouth.",
    },
    {
      id: 3,
      name: "Gulab Jamun",
      category: "Indian Sweet",
      price: 400,
      quantity: 20,
      description: "Soft, spongy milk-based balls soaked in sugar syrup.",
    },
  ]);

  const [filteredSweets, setFilteredSweets] = useState(sweets);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

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

  const handlePurchase = (sweetId) => {
    setSweets((prev) =>
      prev.map((sweet) =>
        sweet.id === sweetId && sweet.quantity > 0
          ? { ...sweet, quantity: sweet.quantity - 1 }
          : sweet
      )
    );

    setFilteredSweets((prev) =>
      prev.map((sweet) =>
        sweet.id === sweetId && sweet.quantity > 0
          ? { ...sweet, quantity: sweet.quantity - 1 }
          : sweet
      )
    );

    alert(`Successfully purchased sweet with ID: ${sweetId}`);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <h1
        style={{ fontSize: "2rem", textAlign: "center", marginBottom: "2rem" }}
      >
        🍬 Welcome to the Sweet Shop Dashboard
      </h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          🔍 Search & Filter
        </h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc" }}
          />
          <input
            placeholder="Filter by category/price..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc" }}
          />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>🍭 Sweets</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredSweets.map((s) => (
            <div
              key={s.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                background: "white",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                {s.name}
              </h3>
              <p>Category: {s.category}</p>
              <p>Price: ₹{s.price}</p>
              <p>Stock: {s.quantity}</p>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {s.description}
              </p>

              <button
                onClick={() => handlePurchase(s.id)}
                disabled={s.quantity === 0}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "0.5rem",
                  background: s.quantity === 0 ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: s.quantity === 0 ? "not-allowed" : "pointer",
                }}
              >
                {s.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PubDashboard;
