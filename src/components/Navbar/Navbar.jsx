import React, { useContext, useEffect, useState } from "react";
import { motion } from 'motion/react'

import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinkWIthIcon from "./LinkWIthIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "./../../contexts/CartContext";
import { getSuggestionsAPI } from "../../services/productService";

const Navbar = () => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();
  const cartCount = cart?.length || 0;

  // console.log(cart);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(()=>{
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    },300); // delaying getSuggestionsAPI call for 300 milli seconds

    return () => {
      clearTimeout(delaySuggestions);
    };
  }, [search]);

  const handleKeyDown = (e) => {
    // console.log(e.key);
    if(selectedItem < suggestions.length){
      if (e.key === "ArrowDown") {
        setSelectedItem((current) => current === suggestions.length-1 ? 0: current + 1);
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) => current === 0? suggestions.length-1 : current - 1);
      } else if(e.key === "Enter") {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
        setSelectedItem(-1);
      }
    }
    else {
      setSelectedItem(-1);
    }
  };

  return (
    <motion.nav 
        className=" align_center navbar"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="navbar_button">Search</button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion,index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWIthIcon title="Home" emoji={rocket} link="/" />
        <LinkWIthIcon title="Products" emoji={star} link="/products" />
        {!user && (
          <>
            <LinkWIthIcon title="Login" emoji={idButton} link="/login" />
            <LinkWIthIcon title="signUp" emoji={memo} link="/signup" />
          </>
        )}
        {user && (
          <>
            <LinkWIthIcon title="My Orders" emoji={order} link="/myorders" />
            <LinkWIthIcon title="Logout" emoji={lock} link="/logout" />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_count">{cartCount}</p>
            </NavLink>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
