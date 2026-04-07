import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./../Home/HomePage";
import ProductsPage from "./../Products/ProductsPage";
import SingleProductPage from "./../SingleProduct/SingleProductPage";
import SignupPage from "./../Authentication/SignupPage";
import LoginPage from "./../Authentication/LoginPage";
import MyOrderPage from "./../MyOrder/MyOrderPage";
import CartPage from "./../Cart/CartPage";
import Logout from "../Authentication/Logout";
import CartContext from "../../contexts/CartContext";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  const { cart, addToCart } = useContext(CartContext);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/product/:id"
        element={<SingleProductPage addToCart={addToCart} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
