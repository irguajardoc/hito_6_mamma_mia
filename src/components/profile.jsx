
import { useUser } from "../context/UserContext.jsx";

export default function Profile() {
  const { token } = useUser();
  return (
    <div className="container py-5">
      <h2 className="mb-3">Mi perfil</h2>
      <p className="text-muted">Estás autenticado. Token actual:</p>
      <code className="d-block p-3 bg-light rounded">{token}</code>
    </div>
  );
}

