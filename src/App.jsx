import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/lp/LandingPage";
import Login from "./pages/user/Login";
import CartPage from "./pages/user/CartPage";
import AdminLogin from "./pages/admin/LoginAdmin";
import Dashboard from "./pages/admin/Dashboard";
import HomePage from "./pages/user/HomePage";
import ProductsTable from "./pages/admin/ProductsTable";
import AddProductPage from "./pages/admin/AddProductPage";
import "./styles/App.css";
import { CartProvider } from "./components/user/cart/CartContext";
import PrivateRoute from "./components/user/common/PrivateRoute";
import EditProductPage from "./pages/admin/EditProductPage";


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* ROOT REDIRECT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* PUBLIC ROUTES */}
          <Route path="/lp" element={<LandingPage />} />

          {/* USER ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin/*" element={<Dashboard />}>
              <Route path="products" element={<ProductsTable />} />
              <Route path="products/register" element={<AddProductPage />} />
              <Route path="products/edit/:id" element={<EditProductPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
