import React, { memo, useContext, useEffect, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from "../common/Loader";
import UserContext from "../../contexts/UserContext";

const SingleProductPage = ({addToCart}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const user = useContext(UserContext);

  const { data: product, error, isLoading } = useData(`/products/${id}`,null, ["product", id], 10 * 60 * 1000); // 10 mins

  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="products_page_details">
            <div className="single_product_title">{product.title}</div>
            <div className="single_product_description">
              {product.description}
            </div>
            <div className="single_product_price">
              ${product.price.toFixed(2)}
            </div>
            {user && <>
            <div className="quantity_title">Quantity:</div>
            <QuantityInput
              quantity={quantity}
              setQuantity={setQuantity}
              stock={product.stock}
            />
            <button className="search_button add_cart" onClick={()=> addToCart(product,quantity)}>Add to Cart</button>
            </>}
          </div>
        </>
      )}
    </section>
  );
};

export default memo(SingleProductPage);
