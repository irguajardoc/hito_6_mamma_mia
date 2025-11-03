// HITO 8
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, isAuth } = useUser();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (form.password !== form.confirm) {
      setMsg("Las contraseñas no coinciden");
      return;
    }
    const { ok, error: err } = await register({
      email: form.email,
      password: form.password,
    });
    if (ok) {
      setMsg("Registro exitoso ");
      navigate("/profile");
    } else {
      setMsg(err || "No fue posible registrar");
    }
  };

  if (isAuth) {
    navigate("/profile");
  }

  return (
    <div className="container py-4">
      <h2>Registro</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="col-12 col-md-6 p-0">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            className="form-control"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            className="form-control"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar Password</label>
          <input
            name="confirm"
            className="form-control"
            type="password"
            value={form.confirm}
            onChange={onChange}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;