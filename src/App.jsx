import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pagenotfound from "./pages/Pagenotfound";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;
