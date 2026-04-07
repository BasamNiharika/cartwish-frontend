import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import "./ProductsList.css";
import useProductList from "../../hooks/useProductList";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const categoryParam = search.get("category");
  const page = search.get("page");
  const searchQuery = search.get("search");

  // sorting products
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const { data, error, isFetching, hasNextPage, fetchNextPage, status } = useProductList(
    {
      search: searchQuery,
      category: categoryParam,
      perPage: 10,
    },
  );

  // console.log("Status:", status, "Error:", error);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: page });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement; 
      if (scrollTop + clientHeight >= scrollHeight - 1 && !isFetching && hasNextPage && data) {
        console.log("Reached bottom of the page");
        fetchNextPage();
      }
    }
     window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[data, isFetching]);

  useEffect(() => {
    if (data && data?.pages) {
      const products = data?.pages.flatMap((page) => page.products);
      // Remove duplicates by _id
      const uniqueProducts = Array.from(new Map(products.map(p => [p._id, p])).values());
      
      if (sortBy === "price desc") {
        setSortedProducts(uniqueProducts.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(uniqueProducts.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(uniqueProducts.sort((a, b) => b.reviews.rate - a.reviews.rate));
      } else if (sortBy === "rate asc") {
        setSortedProducts(uniqueProducts.sort((a, b) => a.reviews.rate - b.reviews.rate));
      } else {
        setSortedProducts(uniqueProducts)
      }
      // console.log(uniqueProducts);
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting" onChange={e => setSortBy(e.target.value)}>
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>

      <div className="products_list">
        {status === 'error' && <em className="form_error">{error?.message || "Failed to load products"}</em>}
        {isFetching && sortedProducts.length === 0 && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {sortedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
