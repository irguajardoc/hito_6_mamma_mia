
function Profile() {
  
  const email = "usuario@demo.cl";
  return (
    <div className="container py-4">
      <h2>Mi perfil</h2>
      <p><strong>Email:</strong> {email}</p>
      <button className="btn btn-outline-danger">Cerrar sesión</button>
    </div>
  );
}

export default Profile;
