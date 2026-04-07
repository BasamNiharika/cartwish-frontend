import React from "react";

import "./ProductsSidebar.css";
import LinkWIthIcon from "./../Navbar/LinkWIthIcon";
import useData from "../../hooks/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category", null, ["categories"], 24 * 60 * 60 * 1000); // 10 mins

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories && categories.map((category) => (
          <LinkWIthIcon
            key={category._id}
            id={category._id}
            title={category.name}
            link={`/products?category=${category.name}`}
            emoji={`${config.apiURL}/category/${category.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
