import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import UserDetails from "../UserDetails/UserDetails";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;