import React from "react";
import { Router, Outlet } from "react-location";

import Header from "./Header";
import Footer from "./Footer";

import { routes, location } from "../router";

export default function MainLayout() {
  return (
    <Router routes={routes} location={location}>
      <div className="text-3xl mx-auto max-w-6xl">
        <Header />
        <div className="my-10">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
