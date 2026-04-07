const cartReducer = (cart, action) => {
  const oldCart = [...cart];
  switch (action.type) {
    // Add to cart
    case "ADD_TO_CART":
      const updateCart = [...oldCart];
      const { product, quantity } = action.payload;
      const productIndex = updateCart.findIndex(
        (item) => item.product._id === product._id,
      );
      if (productIndex === -1) {
        updateCart.push({ product: product, quantity: quantity });
      } else {
        updateCart[productIndex].quantity = quantity;
      }
      // console.log(updateCart);
      return updateCart;

    // Set cart to ( old or updated records )
    case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : [];

    // Intially get cart
    case "GET_CART":
      return Array.isArray(action.payload) ? action.payload : [];

    // Update cart
    case "UPDATE_CART_QUANTITY":
      let updatedCart = Array.isArray(cart) ? [...cart] : [];
      const {type,id:idx} = action.payload;

      const productIndx = updatedCart.findIndex((item) => item.product._id === idx);

      // console.log(productIndx)
      if(type === "increase") {
        updatedCart[productIndx].quantity += 1;
      }
      else if(type === "decrease"){
        updatedCart[productIndx].quantity -= 1;
      }

      return updatedCart;

    case "REMOVE_CART_ITEM":
      const { product_id } = action.payload;
      const currentCart = Array.isArray(cart) ? cart : [];
      return currentCart.filter((item)=> item.product._id !== product_id)

    case "REVERT_CART":
      return Array.isArray(action.payload) ? action.payload : [];

    default:
      return cart;
  }
};

export default cartReducer;
