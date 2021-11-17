import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Product, getProductById, currency } from "../lib/products";
import { addToCart, useLoggedIn } from "../lib/cart";

export default function PDPContent() {
  const loggedIn = useLoggedIn();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) return null;

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <img src={product.image} alt={product.name} />
      </div>
      <div>
        <div className="flex">
          <h1 className="font-bold text-3xl flex-grow">{product.name}</h1>
          <div className="font-bold text-3xl flex-end">
            {currency.format(product.price)}
          </div>
        </div>
        {loggedIn && (
          <div className="text-right mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
              onClick={() => addToCart(product.id)}
              id={`addtocart_${product.id}`}
            >
              Add to Cart
            </button>
          </div>
        )}
        <div className="mt-10">{product.description}</div>
        <div className="mt-10">{product.longDescription}</div>
      </div>
    </div>
  );
}
