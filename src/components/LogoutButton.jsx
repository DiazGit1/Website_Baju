import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dan role dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");

    // Redirect ke halaman login
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
