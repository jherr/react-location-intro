import React from "react";
import { getProducts } from "../lib/products";

export default {
  loader: async () => {
    return {
      products: await getProducts(),
    };
  },
  element: () => import("./HomeContent").then((module) => <module.default />),
};
