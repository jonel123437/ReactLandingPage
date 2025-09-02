import Navbar from '../../components/user/common/UserNavbar';
import AddCreditCard from '../../components/user/profile/AddCreditCard';

export default function AddCreditCardPage() {
  return (
    <div className="add-credit-card-page">
      <Navbar />
      <main>
        <AddCreditCard />
      </main>
    </div>
  );
}
