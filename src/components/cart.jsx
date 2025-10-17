import { clp } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { pizzas } from "../data/pizzas.js";

const Cart = () => {
  const { cart, inc, dec, add, total } = useCart();

  const isEmpty = cart.length === 0;

  return (
    <main className="container py-4">
      <h2 className="mb-4">Tu Carrito 🧺</h2>

      {isEmpty ? (
        <>
          <div className="alert alert-info">No tienes productos en el carrito.</div>
          {}
          <h5 className="mt-3">Sigue comprando 🍕</h5>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {pizzas.map((p) => (
              <div className="col" key={p.id}>
                <div className="card h-100 shadow-sm">
                  <img src={p.img} className="card-img-top" alt={p.name} />
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="fw-bold mb-3">${clp(p.price)}</p>
                    <button className="btn btn-primary mt-auto" onClick={() => add(p.id)}>
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <ul className="list-group">
              {cart.map((it) => (
                <li key={it.id} className="list-group-item py-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={it.img}
                      alt={it.name}
                      width={80}
                      height={80}
                      className="rounded object-fit-cover"
                    />
                    <div className="me-auto">
                      <h6 className="mb-1">{it.name}</h6>
                      <small className="text-muted">Precio unitario: ${clp(it.price)}</small>
                    </div>

                    <div className="btn-group" role="group" aria-label="qty">
                      <button className="btn btn-outline-secondary" onClick={() => dec(it.id)}>−</button>
                      <span className="btn btn-light disabled">{it.qty}</span>
                      <button className="btn btn-outline-secondary" onClick={() => inc(it.id)}>+</button>
                    </div>

                    <div className="ms-3 text-end" style={{ minWidth: 120 }}>
                      <div className="fw-bold">${clp(it.price * it.qty)}</div>
                      <small className="text-muted">Subtotal</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Resumen</h5>
                <div className="d-flex justify-content-between my-2">
                  <span>Total</span>
                  <strong>${clp(total)}</strong>
                </div>
                <button className="btn btn-success w-100 mt-2" disabled={isEmpty}>
                  Pagar
                </button>
                <small className="d-block text-muted mt-2">
                  * Botón sin acción por ahora.
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;