import React, { useState } from 'react';

const CreateSweet = ({ onSweetCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    description: '',
    price: ''
  });
  const [message, setMessage] = useState('');

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateSweet = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setMessage('Sweet created successfully');
        setFormData({ name: '', category: '', quantity: '', description: '', price: '' });
        if (onSweetCreated) {
          onSweetCreated();
        }
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating sweet:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 p-6">
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

        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              placeholder="category"
              value={formData.category}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              name="quantity"
              placeholder="quantity"
              value={formData.quantity}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="description"
              placeholder="description"
              value={formData.description}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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

        {/* Display form data for testing */}
        {formData.name && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Form Preview:</h3>
            <p>{formData.name}</p>
            <p>{formData.category}</p>
            <p>{formData.description}</p>
            <p>{formData.quantity}</p>
            <p>{formData.price}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSweet;