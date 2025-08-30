import Navbar from '../../components/user/common/UserNavbar';
import OurProduct from '../../components/user/products/OurProduct';
import Footer from '../../components/user/common/Footer';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <OurProduct />
      </main>
      <Footer />
    </div>
  );
}
