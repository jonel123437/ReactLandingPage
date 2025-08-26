import React from 'react';
import Hero from '../components/Hero';
import TopProducts from '../components/TopProducts';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCollection from '../components/ProductCollection';
import OurProduct from '../components/OurProduct';
import DiscountSection from '../components/DiscountSection';
import LatestBlogPosts from '../components/LatestBlogPosts';
import FeaturedVideo from '../components/FeaturedVideo';
import Contact from '../components/Contact';



export default function Home() {
  return (
    <div className="home-page">
      <Header />
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
