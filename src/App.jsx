import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Cart from "./pages/user/Cart";
import AdminLogin from "./pages/admin/LoginAdmin";
import AdminDashboard from "./pages/admin/Dashboard";
import "./styles/App.css";
import { CartProvider } from "./components/cart/CartContext";
import PrivateRoute from "./components/common/PrivateRoute"; // updated PrivateRoute

function App() {
  return (
    <CartProvider>
      <Router basename="/lp">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected user routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
