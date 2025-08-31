import "./styles/App.css";
import Login from "./pages/user/Login";
import CartPage from "./pages/user/CartPage";
import HomePage from "./pages/user/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import LandingPage from "./pages/lp/LandingPage";
import AdminLogin from "./pages/admin/LoginAdmin";
import ProfilePage from "./pages/user/ProfilePage";
import ProductsTable from "./pages/admin/ProductsTable";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import PrivateRoute from "./components/user/common/PrivateRoute";
import { CartProvider } from "./components/user/cart/CartContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddCreditCardPage from "./pages/user/AddCreditCardPage";
import ProfileDetailsPage from "./pages/user/ProfileDetailsPage";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="108213073544-ik9t6j1g4vqppmvr2a3ko4b2gndm5g0v.apps.googleusercontent.com">
      <CartProvider>
        <Router>
          <Routes>
            {/* ROOT REDIRECT */}
            <Route path="/" element={<Navigate to="/lp" replace />} />

            {/* PUBLIC ROUTES */}
            <Route path="/lp" element={<LandingPage />} />

            {/* USER ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />          
              <Route path="/profile/details" element={<ProfileDetailsPage />} />
              <Route path="/profile/add-card" element={<AddCreditCardPage />} />
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
    </GoogleOAuthProvider>
  );
}

export default App;
