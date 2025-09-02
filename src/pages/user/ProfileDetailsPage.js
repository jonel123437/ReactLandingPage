import Navbar from '../../components/user/common/UserNavbar';
import Footer from '../../components/user/common/Footer';
import ProfileDetails from '../../components/user/profile/ProfileDetails';
import { useState, useEffect } from 'react';

export default function ProfileDetailsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/current', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not logged in.</div>;

  return (
    <div className="profile-details-page">
      <Navbar />
      <main>
        <ProfileDetails user={user} />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
