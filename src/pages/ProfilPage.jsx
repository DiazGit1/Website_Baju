import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser'; // Import useUser hook
import Header from '../components/Header';
import './ProfilPage.css';

const ProfilPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Memastikan data dari localStorage dimuat dengan benar
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");
    if (savedFullName && savedEmail) {
      setUser({ fullName: savedFullName, email: savedEmail });
    }
  }, [setUser]); // Hanya jalankan sekali saat komponen dimuat
  

  const handleLogout = () => {
    // Hapus data pengguna dari localStorage dan context
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    setUser(null);
    navigate("/");
  };
  

  if (!user) {
    return <div className="no-access">Silakan login untuk melihat profil Anda.</div>;
  }

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-card">
          <h2 className="profile-title">Profil Pengguna</h2>
          <p className="profile-info">
            <strong>Nama:</strong> {user.fullName || "Nama tidak tersedia"}
          </p>
          <p className="profile-info">
            <strong>Email:</strong> {user.email || "Email tidak tersedia"}
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilPage;
