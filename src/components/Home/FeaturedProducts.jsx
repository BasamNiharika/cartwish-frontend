import React from "react";
import { motion } from 'motion/react'

import "./FeaturedProducts.css";
import ProductCard from "./../Products/ProductCard";
import useData from "./../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useData("products/featured", null, ["products", "featured"], 10 * 60 * 60 * 1000); //10 hrs
  const skeletons = [1, 2, 3];

  return (
    <section className="feature_products">
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >Featured Products</motion.h2>
      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data &&
          data.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 * index }}
            >
              <ProductCard key={product._id} product={product} />
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
