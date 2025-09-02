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
import AddCreditCardPage from "./pages/user/AddCreditCardPage";
import CardList from "./pages/user/CardListPage";
import ProfileDetailsPage from "./pages/user/ProfileDetailsPage";
import { CartProvider } from "./components/user/cart/CartContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import UserPrivateRoute from "./components/user/common/UserPrivateRoute";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <CartProvider>
        <Router>
          <Routes>
            {/* ROOT REDIRECT */}
            <Route path="/" element={<Navigate to="/lp" replace />} />

            {/* PUBLIC ROUTES */}
            <Route path="/lp" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* USER ROUTES */}
            <Route element={<UserPrivateRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/details" element={<ProfileDetailsPage />} />
              <Route path="/profile/card-list" element={<CardList />} />
              <Route path="/profile/add-card" element={<AddCreditCardPage />} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route element={<AdminPrivateRoute />}>
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
