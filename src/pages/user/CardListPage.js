import Navbar from '../../components/user/common/UserNavbar';
import CreditCardList from '../../components/user/profile/CreditCardList';

export default function ProfilePage() {
  return (
    <div className="card-list-page">
      <Navbar />
      <main>
        <CreditCardList />
      </main>
    </div>
  );
}
