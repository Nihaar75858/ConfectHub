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
import CreateSweet from "./CreateSweet";
import UpdateSweet from "./UpdateSweet";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [message, setMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);

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
    // Fetch admin data
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => setAdminData(data))
      .catch((err) => console.error(err));

    // Fetch initial data
    fetchUsers();
    fetchSweets();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(
        data.users || [
          {
            id: 1,
            name: "John Doe",
            email: "user@example.com",
            username: "John",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            username: "Jane",
          },
        ]
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSweets = async () => {
    try {
      const sweetsData = await makeAuthenticatedRequest(
        "http://localhost:8000/api/sweets/"
      );
      console.log("Sweets data:", sweetsData);

      if (sweetsData.sweets && Array.isArray(sweetsData.sweets)) {
        setSweets(sweetsData.sweets);
        //   setFilteredSweets(sweetsData.sweets);
      } else {
        setSweets([]);
        //   setFilteredSweets([]);
      }
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };

  const handleDeleteSweet = async (sweetId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/sweets/${sweetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("sweet deleted");
        fetchSweets();
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting sweet:", error);
    }
  };

  const handleUpdateClick = (sweet) => {
    setSelectedSweet(sweet);
    setShowUpdateForm(true);
  };

  const handleSweetCreated = () => {
    fetchSweets();
    setTimeout(() => {
      setShowCreateForm(false);
    }, 1500);
  };

  const handleSweetUpdated = () => {
    fetchSweets();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Admin</span>
            <span>{adminData.email || "user@admin.com"}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {message && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl text-blue-600">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Total Sweets</h3>
              <p className="text-3xl text-green-600">{sweets.length}</p>
            </div>
          </div>
        </div>

        {/* View Sweets Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">All Sweets</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create New Sweet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sweets.map((sweet) => (
              <div key={sweet.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{sweet.name}</h3>
                <p className="text-gray-600 mb-2">{sweet.category}</p>
                <p className="text-gray-700 mb-4">{sweet.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-600">
                    ₹{sweet.price}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      sweet.quantity > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    Stock: {sweet.quantity}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateClick(sweet)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                  >
                    UPDATE
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${sweet.name}?`
                        )
                      ) {
                        handleDeleteSweet(sweet.id);
                      }
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal Forms */}
      {showCreateForm && (
        <SweetForm
          onSweetCreated={handleSweetCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {showUpdateForm && (
        <UpdateSweet
          sweet={selectedSweet}
          onSweetUpdated={handleSweetUpdated}
          onCancel={() => {
            setShowUpdateForm(false);
            setSelectedSweet(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
