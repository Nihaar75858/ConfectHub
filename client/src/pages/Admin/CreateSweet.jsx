import React, { useState } from "react";

const CreateSweet = ({ onSweetCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");

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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSweet = async () => {
    try {
      const response = await makeAuthenticatedRequest("http://localhost:8000/api/sweets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Sweet created successfully");
        setFormData({
          name: "",
          category: "",
          quantity: "",
          description: "",
          price: "",
        });
        if (onSweetCreated) {
          onSweetCreated();
        }
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating sweet:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Sweet</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Flex container for preview and form */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          {formData.name && (
            <div className="lg:w-1/2 p-4 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">Form Preview:</h3>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Category:</strong> {formData.category}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Quantity:</strong> {formData.quantity}
              </p>
              <p>
                <strong>Price:</strong> ₹{formData.price}
              </p>
            </div>
          )}

          {/* Form */}
          <div className="lg:w-1/2 space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="category"
                placeholder="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                name="quantity"
                placeholder="quantity"
                value={formData.quantity}
                onChange={handleFormChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="description"
                value={formData.description}
                onChange={handleFormChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="price"
                value={formData.price}
                onChange={handleFormChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateSweet}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Sweet
              </button>
              <button
                onClick={onCancel}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSweet;
