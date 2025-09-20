// import { render, screen, fireEvent } from "@testing/library";
// import AdminDashBoard from "./AdminDashBoard";
// import UserData from "./UserData";
// import ViewSweets from './ViewSweets';
// import SweetForm from "./SweetForm";
// import UpdateSweet from "./UpdateSweet";
// import DeleteSweet from "./DeleteSweet";

// test("Admin Dashboard is only shown to those who have admin role", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           name: "Admin",
//           email: "user@admin.com",
//         }),
//     })
//   );

//   if (role == "admin") allow;
//   else reject;

//   render(<AdminDashBoard />);

//   expect(await screen.findByText(/Admin/i)).toBeInTheDocument();
//   expect(await screen.findByText(/user@admin.com/i)).toBeInTheDocument();
// });

// test("Admin can see all the users on the site", async () => {
//     global.fetch = jest.fn(() =>
//         Promise.resolve({
//         json: () =>
//             Promise.resolve({
//                 users: users
//             }),
//         })
//     );

//     render(<UserData />);

//     expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
//     expect(await screen.findByText(/user@example.com/i)).toBeInTheDocument();
//     expect(await screen.findByText(/John/i)).toBeInTheDocument();
// })

// test("Admin can create sweets", async () => {
//   render(<SweetForm />);

//   fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "Peda" } });
//   fireEvent.change(screen.getByPlaceholderText("category"), { target: { value: "Traditional Sweet" } });
//   fireEvent.change(screen.getByPlaceholderText("quantity"), { target: { value: 100 } });
//   fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "Soft, spongy milk-based balls soaked in sugar syrup." } });
//   fireEvent.change(screen.getByPlaceholderText("price"), { target: { value: 120 } });

//   expect(await screen.findByText(/Peda/i)).toBeInTheDocument();
//   expect(await screen.findByText(/Traditional Sweet/i)).toBeInTheDocument();
//   expect(await screen.findByText(/Soft, spongy milk-based balls soaked in sugar syrup./i)).toBeInTheDocument();
//   expect(screen.findByText(/120/i)).tobeNull();
// });

// test("Admin can view sweets", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           sweets: [{ name: "Peda", category: "Indian", price: 50, description: "Soft, spongy milk-based balls soaked in sugar syrup.", quantity: 100 }]
//         }),
//     })
//   );

//   render(<ViewSweets />);

//   expect(await screen.findByText(/peda/i)).toBeInTheDocument();
//   expect(await screen.findByText(/Indian/i)).toBeInTheDocument();
//   expect(await screen.findByText(/50/i)).toBeInTheDocument();
//   expect(await screen.findByText(/Soft, spongy milk-based balls soaked in sugar syrup./i)).toBeInTheDocument();
//   expect(await screen.findByText(/100/i)).toBeInTheDocument();
// });

// test("Admin should be update and delete sweets", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(
//         { name: "Peda", category: "Indian", price: 50, quantity: 100 },
//         { name: "Donut", category: "Western", price: 100, quantity: 0  }),
//     })
//   );

//   if(Admin.click == 'UPDATE') {
//     render(<UpdateSweet />);

//     fireEvent.change(restock, { target: { value: quantity + added_quantity } });

//     expect(await screen.findByText(/restock/i)).toBeInTheDocument();
//   }

//   if(Admin.click == 'DELETE') {
//     render(<DeleteSweet />);

//     fireEvent.change(delete, { target: sweet });

//     expect(await screen.findByText(/sweet deleted/i)).toBeInTheDocument();
//   }
// });

import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [adminData, setAdminData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    description: "",
    price: "",
  });
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [message, setMessage] = useState("");
  const [editingSweet, setEditingSweet] = useState(null);

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

  //   useEffect(() => {
  //     if (role !== "admin") {
  //       return; // Reject access
  //     }

  //     // Fetch admin data
  //     fetch('http://localhost:8000/api/admin/profile')
  //       .then(res => res.json())
  //       .then(data => setAdminData(data))
  //       .catch(err => console.error(err));
  //   }, []);

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/api/users');
  //       const data = await response.json();
  //       setUsers(data.users || [
  //         { id: 1, name: 'John Doe', email: 'user@example.com', username: 'John' },
  //         { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'Jane' }
  //       ]);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  const fetchSweets = async () => {
    try {
      const sweetsData = await makeAuthenticatedRequest(
        "http://localhost:8000/api/sweets/"
      );
      console.log("Sweets data:", sweetsData);

      if (sweetsData.sweets && Array.isArray(sweetsData.sweets)) {
        setSweets(sweetsData.sweets);
        // setFilteredSweets(sweetsData.sweets);
      } else {
        setSweets([]);
        // setFilteredSweets([]);
      }
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };

  useEffect(() => {
    // if (currentView === 'users') {
    //   fetchUsers();
    // } else
    if (
      currentView === "viewSweets" ||
      currentView === "updateSweet" ||
      currentView === "deleteSweet"
    ) {
      fetchSweets();
    }
  }, [currentView]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSweet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/sweets", {
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
      }
    } catch (error) {
      console.error("Error creating sweet:", error);
    }
  };

  const handleUpdateSweet = async (sweetId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/sweets/${sweetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        setMessage("Sweet updated successfully");
        fetchSweets();
        setEditingSweet(null);
        setSelectedSweet(null);
        setUpdateData({});
      }
    } catch (error) {
      console.error("Error updating sweet:", error);
    }
  };

  const handleDeleteSweet = async (sweetId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/sweets/${sweetId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage("sweet deleted");
        fetchSweets();
      }
    } catch (error) {
      console.error("Error deleting sweet:", error);
    }
  };

  const handleRestock = (sweet) => {
    const addedQuantity = parseInt(updateData.quantity) || 0;
    const newQuantity = sweet.quantity + addedQuantity;
    setUpdateData({ ...updateData, quantity: newQuantity });
  };

  const startEdit = (sweet) => {
    setEditingSweet(sweet.id);
    setUpdateData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      description: sweet.description
    });
  };

  const cancelEdit = () => {
    setEditingSweet(null);
    setUpdateData({});
  };

  // Role-based access control
  if (role !== "admin") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Admin</span>
            <span>{adminData.email || "user@admin.com"}</span>
          </div>
        </div>
      </header>

      <nav className="bg-blue-500 text-white p-2">
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`px-4 py-2 rounded ${
              currentView === "dashboard" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView("users")}
            className={`px-4 py-2 rounded ${
              currentView === "users" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setCurrentView("viewSweets")}
            className={`px-4 py-2 rounded ${
              currentView === "viewSweets" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            View Sweets
          </button>
          <button
            onClick={() => setCurrentView("createSweet")}
            className={`px-4 py-2 rounded ${
              currentView === "createSweet"
                ? "bg-blue-700"
                : "hover:bg-blue-600"
            }`}
          >
            Create Sweet
          </button>
        </div>
      </nav>

      <main className="p-6">
        {message && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-3xl text-blue-600">{users.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Sweets</h3>
                <p className="text-3xl text-green-600">{sweets.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Low Stock Items</h3>
                <p className="text-3xl text-red-600">
                  {sweets.filter((s) => s.quantity < 10).length}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentView === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.username}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === "createSweet" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Create New Sweet</h2>
            <div className="bg-white p-6 rounded-lg shadow max-w-lg">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="category"
                  placeholder="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="quantity"
                  placeholder="quantity"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="description"
                  placeholder="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleCreateSweet}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Sweet
              </button>
            </div>

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
        )}

        {currentView === 'viewSweets' && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Sweets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sweets.map(sweet => (
                <div key={sweet.id} className="bg-white p-6 rounded-lg shadow">
                  {editingSweet === sweet.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={updateData.name || ''}
                        onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg font-semibold"
                      />
                      <input
                        type="text"
                        value={updateData.category || ''}
                        onChange={(e) => setUpdateData({...updateData, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600"
                      />
                      <textarea
                        value={updateData.description || ''}
                        onChange={(e) => setUpdateData({...updateData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                        rows="2"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={updateData.price || ''}
                          onChange={(e) => setUpdateData({...updateData, price: e.target.value})}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          value={updateData.quantity || ''}
                          onChange={(e) => {
                            setUpdateData({...updateData, quantity: parseInt(e.target.value) || 0});
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Quantity"
                        />
                      </div>
                      <div className="text-sm text-blue-600">
                        restock: Current quantity will be {updateData.quantity}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateSweet(sweet.id, updateData)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2">{sweet.name}</h3>
                      <p className="text-gray-600 mb-2">{sweet.category}</p>
                      <p className="text-gray-700 mb-4">{sweet.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-green-600">₹{sweet.price}</span>
                        <span className={`px-2 py-1 rounded text-sm ${sweet.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          Stock: {sweet.quantity}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(sweet)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                        >
                          UPDATE
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
                              handleDeleteSweet(sweet.id);
                            }
                          }}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm"
                        >
                          DELETE
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
