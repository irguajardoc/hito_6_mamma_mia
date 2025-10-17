import { createContext, useContext, useEffect, useState } from "react";
import { getPizzas } from "../services/api.js";

const PizzasContext = createContext(null);

export function PizzasProvider({ children }) {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPizzas();

        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          id: p.id ?? p._id ?? p.code ?? "",
          name: p.name ?? p.title ?? "Pizza",
          price: Number(p.price ?? p.valor ?? 0),
          img: p.img ?? p.image ?? p.imgUrl ?? "",
          ingredients: Array.isArray(p.ingredients)
            ? p.ingredients
            : (typeof p.ingredients === "string"
                ? p.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
                : []),
        }));

        if (!cancelled) setPizzas(normalized);
      } catch (e) {
        if (!cancelled) setError("No se pudieron cargar las pizzas desde el servicio web");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <PizzasContext.Provider value={{ pizzas, loading, error }}>
      {children}
    </PizzasContext.Provider>
  );
}

export function usePizzas() {
  const ctx = useContext(PizzasContext);
  if (!ctx) throw new Error("usePizzas debe usarse dentro de <PizzasProvider> // HITO 6");
  return ctx;
}
