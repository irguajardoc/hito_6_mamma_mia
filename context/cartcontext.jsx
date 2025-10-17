
import { createContext, useContext, useMemo, useState } from "react";
import { pizzaCart, pizzas } from "../data/pizzas.js";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(pizzaCart);
  const inc = (id) =>
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));

  const dec = (id) =>
    setCart((c) =>
      c
        .map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0)
    );

  
const add = (pizza) => {
  setCart((prev) => {
    const found = prev.find((p) => p.id === pizza.id);
    return found
      ? prev.map((p) => (p.id === pizza.id ? { ...p, qty: p.qty + 1 } : p))
      : [...prev, { id: pizza.id, name: pizza.name, price: pizza.price, img: pizza.img, qty: 1 }];
  });
};

 
  const total = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

   return (
    <CartContext.Provider value={{ cart, inc, dec, add, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
};
