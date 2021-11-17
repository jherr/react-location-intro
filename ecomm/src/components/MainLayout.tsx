import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import PDPContent from "./PDPContent";
import HomeContent from "./HomeContent";
import CartContent from "./CartContent";

export default function MainLayout() {
  return (
    <Router>
      <div className="text-3xl mx-auto max-w-6xl">
        <Header />
        <div className="my-10">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/product/:id" element={<PDPContent />} />
            <Route path="/cart" element={<CartContent />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
