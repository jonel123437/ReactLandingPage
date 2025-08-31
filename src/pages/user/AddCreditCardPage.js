import Navbar from '../../components/user/common/UserNavbar';
import Footer from '../../components/user/common/Footer';
import AddCreditCard from '../../components/user/profile/AddCreditCard';

export default function AddCreditCardPage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <AddCreditCard />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
