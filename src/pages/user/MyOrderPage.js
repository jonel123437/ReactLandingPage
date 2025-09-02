import Navbar from '../../components/user/common/UserNavbar';
import MyOrderList from '../../components/user/orders/MyOrderList';

export default function ProfilePage() {
  return (
    <div className="my-order-page">
      <Navbar />
      <main>
        <MyOrderList />
      </main>
    </div>
  );
}
