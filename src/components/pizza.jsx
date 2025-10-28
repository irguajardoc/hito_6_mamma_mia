import { useEffect, useState } from "react";
import { getPizzaById } from "../services/api";
import { clp } from "../utils/format";
import { usePizzas } from "../context/pizzascontext.jsx";


export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getPizzaById(id);
        if (mounted) setPizza(data);
      } catch (e) {
        if (mounted) setError("No fue posible cargar la pizza.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="container py-5">Cargando pizza...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;
  if (!pizza) return null;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img
            src={pizza.img}
            alt={pizza.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-12 col-md-6">
          <h2 className="mb-2 text-capitalize">{pizza.name}</h2>
          <p className="text-muted">{pizza.desc || "Nuestra deliciosa pizza."}</p>

          <h6 className="mt-4">Ingredientes:</h6>
          <ul className="list-unstyled mb-4">
            {pizza.ingredients?.map((ing) => (
              <li key={ing}>🍕 {ing}</li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <strong className="fs-4">${clp(pizza.price)}</strong>
            <button className="btn btn-primary">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}
