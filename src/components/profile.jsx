// HITO 8
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuth, email, profile, fetchProfile, logout, loading } = useUser();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isAuth && !profile) fetchProfile();
  }, [isAuth]);

  return (
    <div className="container py-4">
      <h2>Mi perfil</h2>
      <p className="mb-1"><strong>Email:</strong> {email || profile?.email}</p>
      {loading && <div className="text-muted">Cargando perfil...</div>}

      <button
        className="btn btn-outline-danger mt-3"
        onClick={() => {
          logout(); 
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;