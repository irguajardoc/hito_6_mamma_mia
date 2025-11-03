import { NavLink, useNavigate } from "react-router-dom";
import { clp } from "../utils/format";
import { useCart } from "../context/CartContext.jsx"; 
import { useUser } from "../context/UserContext.jsx"; 

const Navbar = () => {
    const { total } = useCart(); 
    const { token, logout } = useUser();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        "btn btn-outline-light" + (isActive ? " fw-bold" : "");

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
            <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
                <span role="img" aria-label="pizza">
                    🍕
                </span>
                <strong>Pizzería Mamma Mía</strong>
            </NavLink>

            <div className="ms-auto d-flex gap-2">
               
                <NavLink to="/" className={linkClass} end>
                    🍕 Home
                </NavLink>

               
                <NavLink to="/pizza" className={linkClass} end>
                    🍕 Pizza (Hito 4)
                </NavLink>

                
                {token ? (
                    <>
                        <NavLink to="/profile" className={linkClass}>
                            👤 Profile
                        </NavLink>
                        <button className="btn btn-outline-warning" onClick={handleLogout}
                        title={email ? `Cerrar sesión de ${email}` : "Cerrar sesión"}
                        
                        >
                            🔒 Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={linkClass}>
                            🔐 Login
                        </NavLink>
                        <NavLink to="/register" className={linkClass}>
                            🔐 Register
                        </NavLink>
                    </>
                )}

                
                <NavLink to="/cart" className="btn btn-outline-light ms-auto">
                    🛒 Total: ${clp(total)}
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
