import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./views/Home.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Pizza from "../components/Pizza.jsx";
import Cart from "../components/Cart.jsx";
import { CartProvider } from "./context/CartContext.jsx";


function App() {
  return (
    <CartProvider>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h2 className="container my-4">Página no encontrada</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
    </CartProvider>
  );
}
export default App;