import React from "react";
import { Route, ReactLocation, MakeGenerics } from "react-location";
import { Product } from "./lib/products";

export const routes: Route[] = [
  {
    path: "/",
    import: () =>
      import("./components/homeModule").then((module) => module.default),
  },
  {
    path: "product",
    children: [
      {
        path: ":id",
        import: () =>
          import("./components/pdpModule").then((module) => module.default),
      },
    ],
  },
  {
    path: "cart",
    element: () =>
      import("./components/CartContent").then((module) => <module.default />),
  },
];

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    products: Product[];
    product: Product;
  };
}>;

export const location = new ReactLocation();
