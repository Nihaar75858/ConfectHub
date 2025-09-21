import React, { useState, useEffect } from 'react';

const UpdateSweet = ({ sweet, onSweetUpdated, onCancel }) => {
  const [updateData, setUpdateData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (sweet) {
      setUpdateData({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
        description: sweet.description
      });
    }
  }, [sweet]);

  const handleUpdateChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateSweet = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/sweets/${sweet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (response.ok) {
        setMessage('Sweet updated successfully');
        if (onSweetUpdated) {
          onSweetUpdated();
        }
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating sweet:', error);
    }
  };

  const handleRestock = (addedQuantity) => {
    const newQuantity = sweet.quantity + parseInt(addedQuantity || 0);
    setUpdateData({ ...updateData, quantity: newQuantity });
  };

  if (!sweet) return null;

  return (
    <div className="fixed inset-0 bg-white/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Update Sweet: {sweet.name}</h2>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={updateData.name || ''}
              onChange={handleUpdateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={updateData.category || ''}
              onChange={handleUpdateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={updateData.description || ''}
              onChange={handleUpdateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={updateData.price || ''}
                onChange={handleUpdateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
              <input
                type="number"
                name="quantity"
                value={updateData.quantity || ''}
                onChange={(e) => {
                  setUpdateData({...updateData, quantity: parseInt(e.target.value) || 0});
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Stock (Restock)</label>
            <input
              type="number"
              placeholder="Enter quantity to add"
              onChange={(e) => {
                if (e.target.value) {
                  handleRestock(e.target.value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {updateData.quantity !== sweet.quantity && (
              <p className="text-sm text-blue-600 mt-1">
                restock: New quantity will be {updateData.quantity}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleUpdateSweet}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Sweet
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
  );
};

export default UpdateSweet;