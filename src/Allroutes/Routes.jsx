import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import LoginPage from "../components/LoginPage";
import Navbar from "../components/Navbar";
import TableData from "../components/TableData";
import UserDetails from "../components/UserDetails";
import PrivateRoute from "./PrivateRoute";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Navbar />
              <HomePage />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/tabledata"
          element={
            <PrivateRoute>
              <Navbar />
              <TableData />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdetails/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <UserDetails />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
export default AllRoutes;
