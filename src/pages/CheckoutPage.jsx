import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userfullName, setUserfullName] = useState(null); // Menambahkan state untuk fullName
  const navigate = useNavigate();

  useEffect(() => {
    const checkoutOrders = localStorage.getItem('checkoutOrders');
    if (checkoutOrders) {
      const parsedOrders = JSON.parse(checkoutOrders);

      console.log('Parsed Orders:', parsedOrders); // Cek apakah ini berisi objek lengkap

      // Pastikan kita memiliki data lengkap untuk tiap pesanan
      setSelectedOrders(parsedOrders);

      // Hitung total harga
      const total = parsedOrders.reduce((acc, order) => acc + order.totalPrice, 0);
      setTotalPrice(total);
    } else {
      alert('Tidak ada pesanan untuk checkout.');
      navigate('/product');
    }

    // Ambil fullName pengguna
    const fullName = localStorage.getItem('fullName');
    setUserfullName(fullName);
  }, [navigate]);

  const handlePayment = () => {
    // Hapus pesanan dari localStorage
    localStorage.removeItem('checkoutOrders');
    // Arahkan langsung ke halaman payment
    navigate('/payment');
  };

  const handleBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Menampilkan fullName pengguna */}
      {userfullName && <h3>Selamat datang, {userfullName}!</h3>}

      <div className="checkout-list">
        {selectedOrders.length > 0 ? (
          selectedOrders.map((order, index) => {
            console.log('Rendering Order:', order);
            return (
              <div key={index}>
                <h2>Produk: {order.productName}</h2>
                <p>Warna: {order.color}</p>
                <p>Ukuran: {order.size}</p>
                <p>Desain: {order.design}</p>
                <p>Jumlah: {order.quantity}</p>
                <p>Harga Total: Rp {order.totalPrice}</p>
              </div>
            );
          })
        ) : (
          <p>Anda belum memilih pesanan untuk checkout.</p>
        )}
      </div>

      <div className="total-price">
        <h3>Total Harga: Rp {totalPrice.toLocaleString()}</h3>
      </div>

      <div className="action-buttons">
        <button className="btn-back" onClick={handleBack}>
          Kembali
        </button>
        <button className="btn-payment" onClick={handlePayment}>
          Bayar
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
