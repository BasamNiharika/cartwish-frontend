import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

// import user from "../../assets/user.webp";

import "./CartPage.css";
import Table from "../common/Table";
import QuantityInput from "./../SingleProduct/QuantityInput";

import remove from "../../assets/remove.png";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";

const calculateSubTotal = (cart)=> {
  let total = 0;
  cart?.map(({product, quantity})=>{
    total += product.price*quantity;
  });
  return total;
}

const CartPage = () => {
  // const [subTotal, setSubTotal] = useState(0);
  const userObj = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  // useEffect(() => {
  //   let total = 0;
  //   cart.map(({ product, quantity }) => {
  //     total += product.price * quantity;
  //   });
  //   setSubTotal(total);
  // }, [cart]);

  // Calculation subTotal using useMemo hook
  const subTotal = useMemo(() => calculateSubTotal(cart),[cart])

  const checkout = () =>{
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI().then((res)=>{
      toast.success("Order placed successfully !");
    }).catch((err)=>{
      toast.error(err?.response?.data?.message || "Something went wrong!");
      setCart(oldCart);
    })
  }

  return (
    <section className="cart_page align_center">
      <div className="align_center user_info">
        <img
          src={`${config.apiURL}/profile/${userObj?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {userObj?.name}</p>
          <p className="user_email">Email: {userObj?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "price", "quantity", "total", "remove"]}>
        <tbody>
          {cart?.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>$ {product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>$ {product.price * quantity}</td>
              <td>
                <img
                  src={remove}
                  alt="remove_icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>$ {subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$ 4</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>$ {subTotal + 4}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout} >Checkout</button>
    </section>
  );
};

export default memo(CartPage);
