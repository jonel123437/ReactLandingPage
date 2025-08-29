import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/sections/Hero';
import TopProducts from '../components/products/TopProducts';
import ProductCollection from '../components/products/ProductCollection';
import OurProduct from '../components/products/OurProduct';
import DiscountSection from '../components/sections/DiscountSection';
import LatestBlogPosts from '../components/sections/LatestBlogPosts';
import FeaturedVideo from '../components/sections/FeaturedVideo';
import Contact from '../components/sections/Contact';
import Footer from '../components/common/Footer';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <TopProducts />
      <ProductCollection />
      <OurProduct />
      <DiscountSection />
      <LatestBlogPosts />
      <FeaturedVideo />
      <Contact />
      <Footer />
    </div>
  );
}
