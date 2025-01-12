// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/" element={<RegistrationPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;