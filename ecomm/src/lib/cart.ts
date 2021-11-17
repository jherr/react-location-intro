import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

import type { Product } from "./products";

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  cartItems: CartItem[];
}

const API_SERVER = "http://localhost:8080";

export const jwt = new BehaviorSubject<string>(null);
export const cart = new BehaviorSubject<Cart>(null);

export const getCart = (): Promise<Cart> =>
  fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      cart.next(res);
      return res;
    });

export const addToCart = (id): Promise<void> =>
  fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const clearCart = (): Promise<void> =>
  fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const login = (username: string, password: string): Promise<string> =>
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      jwt.next(data.access_token);
      getCart();
      return data.access_token;
    });

export function useLoggedIn(): boolean {
  const [loggedIn, setLoggedIn] = useState(!!jwt.value);
  useEffect(() => {
    setLoggedIn(!!jwt.value);
    const sub = jwt.subscribe((c) => {
      setLoggedIn(!!jwt.value);
    });
    return () => sub.unsubscribe();
  }, []);
  return loggedIn;
}
