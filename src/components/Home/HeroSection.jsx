import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { motion } from 'motion/react'     //react 18
// import { motion } from 'framer-motion'       //react 19

const HeroSection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero_section">
      <motion.div
        className="align_center"
        initial={{ opacity: 0, x: -100 }}
        // animate={{ opacity: 1, x: 0 }}.
        whileInView={{opacity: 1, x: 0}}
        viewport={{once:true, amount: 0.3}}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <Link to={link} className="hero_link">
          Buy Now
        </Link>
      </motion.div>

      <motion.div
        className="align_center"
        initial={{ opacity: 0, x: +100 }}
        // animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{once:true, amount: 0.3}}
        transition={{ duration: 1, ease: "easeInOut" }}>
        <motion.img src={image} alt="" className="hero_image" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
