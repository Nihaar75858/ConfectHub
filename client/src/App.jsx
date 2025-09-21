import "./App.css";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashBoard";
import UpdateSweet from "./pages/Admin/UpdateSweet";
import CreateSweet from "./pages/Admin/CreateSweet";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PubDashboard from "./pages/PublicDashboard/PubDashboard";

function App() {

  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return (
    <main className="overflow-hidden">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/createsweet" element={<CreateSweet />} />
        <Route path="/admin/updatesweet" element={<UpdateSweet />} />
        <Route path="/" element={<PubDashboard />}/>
      </Routes>
    </main>
  );
}

export default App;
