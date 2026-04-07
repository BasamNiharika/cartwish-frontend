import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import UserContext from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { getJwt } from "./services/userService";
import {
  // addToCartAPI,
  // decreaseProductAPI,
  // getCart,
  // increaseProductAPI,
  // removeFromCart as removeFromCartAPI,
} from "./services/cartService";
import CartContext from "./contexts/CartContext";
import cartReducer from "./reducers/cartReducer";
import useData from "./hooks/useData";
import useAddToCart from "./hooks/useAddToCart";
import useRemoveFromCart from "./hooks/useRemoveFromCart";
import useUpdateCart from "./hooks/useUpdateCart";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCart();

  // console.log(cart);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);

      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (err) { }
  }, []);

  useEffect(() => {
    if (cartData) {
      console.log(cartData);
      dispatch({ type: "GET_CART", payload: cartData })
    }
  }, [cartData])

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  const addToCart = useCallback(
    (product, quantity) => {

      const oldCart = Array.isArray(cart) ? [...cart] : [];
      dispatch({ type: "ADD_TO_CART", payload: { product: product, quantity: quantity } });

      addToCartMutation.mutate({ id: product._id, quantity: quantity }, {
        onError: () => {
          dispatch({ type: "SET_CART", payload: oldCart });
          toast.error("Failed to Add product");
        }
      });
    },
    [cart],
  );

  const removeFromCart = useCallback(
    (id) => {
      let oldCart = Array.isArray(cart) ? [...cart] : [];
      dispatch(({ type: "REMOVE_CART_ITEM", payload: { product_id: id } }));

      removeFromCartMutation.mutate({ id }, {
        onError: () => {
          dispatch({ type: "REVERT_CART", payload: oldCart })
          toast.error("failed to remove product");
        }
      });
    },
    [cart],
  );

  const updateCart = useCallback(
    (type, id) => {
      const oldCart = Array.isArray(cart) ? [...cart] : [];
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { type, id } });

      updateCartMutation.mutate({ type, id }, {
        onError: (err) => {
          dispatch({ type: "SET_CART", payload: oldCart });
          console.log(err);
          toast.error("Error while updating quantity");
        }
      });
    },
    [cart],
  );

  return (
    // providing the context
    <UserContext.Provider value={user}>
      <div className="app">
        <CartContext.Provider
          value={{ cart, addToCart, removeFromCart, updateCart, setCart: (payload) => dispatch({ type: "REVERT_CART", payload }) }}
        >
          <Navbar cartCount={cart?.length} />
          <main className="main">
            <ToastContainer position="top-center" />
            {/* <HomePage /> */}
            {/* <ProductsPage /> */}
            {/* <SingleProductPage /> */}
            {/* <CartPage/> */}
            {/* <MyOrderPage /> */}
            {/* <LoginPage /> */}
            {/* <SignupPage/> */}
            <Routing />
          </main>
        </CartContext.Provider>
      </div>
    </UserContext.Provider>
  );
};

export default App;
