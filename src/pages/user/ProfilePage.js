import Navbar from '../../components/user/common/UserNavbar';
import Footer from '../../components/user/common/Footer';
import ProfileMenu from '../../components/user/profile/ProfileMenu';

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <ProfileMenu />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
