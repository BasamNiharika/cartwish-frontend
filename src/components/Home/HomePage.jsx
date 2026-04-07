import React from "react";
import HeroSection from "./HeroSection";

import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy Apple Note 14 pro"
        subtitle="Experience the power of latest iphone 14 with our most Pro camera ever"
        link="/product/69a4315b324f93cca7c1fe04"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add studio display and colour-matched magic accessories to your bag after configure your mac mini."
        link="/product/69a4315b324f93cca7c1fe0c"
        image={mac}
      />
      {/* Hero Section */}
    </div>
  );
};

export default HomePage;
