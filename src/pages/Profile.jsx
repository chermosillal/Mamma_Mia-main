import { useUser } from '../context/useUser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { email, getProfile, logout } = useUser();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      if (result.success) {
        setProfile(result.profile);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="marco">
      <div className="cart">
        <h1>Profile</h1>
        <p>Email<br/>{profile?.email || email || 'No disponible'}</p>
        <div className='boton'>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </main>
  );
};

export default Profile;