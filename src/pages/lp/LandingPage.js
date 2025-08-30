import React from 'react';
import Navbar from '../../components/user/common/LPNavbar';
import Hero from '../../components/user/sections/Hero';
import TopProducts from '../../components/user/products/TopProducts';
import ProductCollection from '../../components/user/products/ProductCollection';
import OurProduct from '../../components/user/products/OurProduct';
import DiscountSection from '../../components/user/sections/DiscountSection';
import LatestBlogPosts from '../../components/user/sections/LatestBlogPosts';
import FeaturedVideo from '../../components/user/sections/FeaturedVideo';
import Contact from '../../components/user/sections/Contact';
import Footer from '../../components/user/common/Footer';

export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        <TopProducts />
        <ProductCollection />
        <OurProduct />
        <DiscountSection />
        <LatestBlogPosts />
        <FeaturedVideo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
