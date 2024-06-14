// src/App.jsx
import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
