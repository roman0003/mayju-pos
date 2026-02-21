import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const shopName = import.meta.env.VITE_SHOP_NAME;

  return (
    <>
      {/* Top Header */}
      <div className="bg-[#D4AF37] text-white p-4 text-center">
        <h1 className="text-3xl font-bold">{shopName} POS</h1>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/sales"
          element={token ? <Sales /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;