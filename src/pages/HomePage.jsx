import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTshirt,
  faShoppingCart,
  faSignInAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const navigateToOrder = () => {
    navigate('/order');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-2">
          <div className="logo text-2xl font-bold text-orange-400">
            <a href="/">Albana T-Shirt</a>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="text-white hover:text-orange-400">
                  <FontAwesomeIcon icon={faHome} />
                </a>
              </li>
              <li>
                <a href="/products" className="text-white hover:text-orange-400">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-white hover:text-orange-400">
                  <FontAwesomeIcon icon={faTshirt} />
                </a>
              </li>
              {token ? (
                <li>
                  <a href="/profil" className="text-white hover:text-orange-400">
                    <FontAwesomeIcon icon={faUser} />
                  </a>
                </li>
              ) : (
                <li>
                  <a href="/login" className="text-white hover:text-orange-400">
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="hero bg-gradient-to-r from-orange-400 to-red-500 text-white py-32 text-center">
          <div className="w-full">
            <h1 className="text-4xl font-bold mb-6">Welcome to Albana T-Shirt</h1>
            <p className="text-lg mb-8">Design your own style with our premium T-shirt printing services!</p>
            
            {/* Added New Promotional Text */}
            <div className="text-lg mb-8 font-semibold italic">
              <p>&quot;Ekspresikan Gayamu dengan Sablon Baju Berkualitas!&quot;</p>
              <p>&quot;Custom Baju, Custom Style – Pilihan Desain Sesuai Keinginanmu!&quot;</p>
              <p>&quot;Harga Terjangkau, Kualitas Tidak Tertandingi!&quot;</p>
            </div>
            
            <div className="flex justify-center gap-4">
              {!token ? (
                <a href="/login" className="btn bg-white text-red-500 hover:bg-red-500 hover:text-white py-2 px-6 rounded-lg transition">
                  Login
                </a>
              ) : (
                <a href="/order" className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-red-500 py-2 px-6 rounded-lg transition">
                  Order
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="product-showcase py-16 bg-white text-center">
          <h2 className="text-3xl font-semibold text-red-500 mb-12">Our T-Shirt Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Product Cards */}
            <div className="product-card bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition transform hover:translate-y-2" onClick={navigateToOrder}>
              <img src="src/assets/baju_1.jpg" alt="T-Shirt 1" className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-xl font-medium text-gray-800">KAOS</p>
            </div>
            <div className="product-card bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition transform hover:translate-y-2" onClick={navigateToOrder}>
              <img src="src/assets/baju_2.jpg" alt="T-Shirt 2" className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-xl font-medium text-gray-800">KAOS</p>
            </div>
            <div className="product-card bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition transform hover:translate-y-2" onClick={navigateToOrder}>
              <img src="src/assets/baju_3.jpg" alt="T-Shirt 3" className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-xl font-medium text-gray-800">KOAS</p>
            </div>
            <div className="product-card bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition transform hover:translate-y-2" onClick={navigateToOrder}>
              <img src="src/assets/baju_4.jpg" alt="T-Shirt 4" className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-xl font-medium text-gray-800">KAOS</p>
            </div>
            <div className="product-card bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition transform hover:translate-y-2" onClick={navigateToOrder}>
              <img src="src/assets/baju_5.jpg" alt="T-Shirt 5" className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-xl font-medium text-gray-800">KAOS</p>
            </div>
          </div>

          {/* New Promotional Message */}
          <div className="text-lg mb-8 font-semibold italic text-red-500">
            <p>&quot;Desain Sendiri atau Pilih dari Koleksi Kami – Kemudahan Ada di Tangan Anda!&quot;</p>
            <p>&quot;Baju Unik, Tampilan Menarik – Kami Wujudkan!&quot;</p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
        <p>&copy; 2024 T-Shirt Printing Store. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;
