import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  Outlet,
  ReactLocation,
  Link,
  useMatch,
} from "react-location";

import "./index.scss";

const Product = () => {
  const params = useMatch().params;

  return <div>Product page: {JSON.stringify(params)}</div>;
};

const routes: Route[] = [
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "product",
    children: [
      {
        path: ":id",
        element: <Product />,
      },
    ],
  },
  {
    path: "cart",
    element: <div>Cart Page</div>,
  },
];

const location = new ReactLocation();

const App = () => (
  <Router routes={routes} location={location}>
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Outlet />
      <Link to="/cart">Go to cart</Link>
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById("app"));
