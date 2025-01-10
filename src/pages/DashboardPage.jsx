import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Jangan lupa untuk menambahkan file CSS untuk styling
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTshirt,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Header Component
const Header = () => {
  const [userFullname, setUserFullname] = useState('');

  useEffect(() => {
    // Mengambil fullname pengguna dari localStorage
    const fullname = localStorage.getItem('fullname');
    if (fullname) {
      setUserFullname(fullname);
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">T-Shirt Store</Link>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faTshirt} />
              </Link>
            </li>
            <li>
              <Link to="/profil">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Menampilkan nama lengkap pengguna jika tersedia */}
      {userFullname && <div className="user-fullname">Welcome, {userFullname}</div>}
    </header>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      setIsLoggedIn(true);
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Gagal memuat produk:", err);
      setError('Gagal memuat produk. Silakan coba lagi.');
    }
  };

  const handleOrderRedirect = (product) => {
    navigate('/order', { state: { product } }); // Navigasi ke halaman /order dengan data produk
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
    setIsLoggedIn(false);
    navigate('/login'); // Arahkan pengguna ke halaman login
  };

  return (
    <div className="dashboard">
      <Header onLogout={handleLogout} />
      <h2 className="text-center mt-4">Dashboard Produk</h2>
      {!isLoggedIn && <p>Silakan login untuk melihat produk.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoggedIn && (
        <div className="product-list d-flex flex-wrap justify-content-center">
          {products.map((product) => (
            <div key={product._id} className="product-card card shadow-sm m-3">
              <img
                src={product.image || '../asset.mk4.jpg'}
                alt={product.name}
                className="product-image card-img-top"
              />
              <div className="product-info card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.price} IDR</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleOrderRedirect(product)} // Panggil fungsi navigasi
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
