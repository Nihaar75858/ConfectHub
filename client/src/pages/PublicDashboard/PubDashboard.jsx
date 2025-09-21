import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

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

  const handlePurchase = () => {
    alert("Please login to purchase sweets.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[450px]">
        {/* Background Image */}
        <img src="/sweets.jpg" alt="ConfectHub" className="w-full h-full" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4">
              Welcome to ConfectHub
            </h1>
            <p className="text-lg md:text-xl text-amber-500 max-w-2xl">
              A Sweet Shop designated only for your tastes.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="mb-2 p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
            Search & Filter
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
        </motion.div>
      </section>

      <section className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-2 text-lg">Sweets</h2>

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
                    <span className="text-white font-semibold">{s.name}</span>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {s.name}
                    </h3>
                    <p className="text-sm text-gray-600">{s.category}</p>
                    <p className="text-sm text-gray-700">₹{s.price}</p>
                  </div>

                  <button
                    onClick={() => handlePurchase(s.id)}
                    className="w-full px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Mithai
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Delivery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Your Order
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Sweets Library
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">About Us</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Our Shops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Policies
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">
                    123 Business St, City, State 12345
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">+91 9828947247</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">customer@confecthub.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <p className="text-gray-400 text-sm">
                  Get the latest updates and offers.
                </p>
              </div>
              <div className="flex w-full md:w-auto max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 Company Name. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PubDashboard;
