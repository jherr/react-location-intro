import React from "react";

import { getProductById } from "../lib/products";

export default {
  loader: async ({ params }) => {
    return {
      product: await getProductById(params.id),
    };
  },
  element: () => import("./PDPContent").then((module) => <module.default />),
};
