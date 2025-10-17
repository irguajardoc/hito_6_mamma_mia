import Header from "../components/Header.jsx";
import { usePizzas } from "../context/pizzascontext.jsx";
import CardPizza from "../components/CardPizza.jsx";

export default function Home() {
  const { pizzas, loading, error } = usePizzas();

  if (loading) return <div className="container py-5">Cargando pizzas...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row g-4">
          {pizzas.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <CardPizza {...p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}