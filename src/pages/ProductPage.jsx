import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

const ProductPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu untuk mengakses halaman ini.');
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  // Handle checkbox selection
  const handleCheckboxChange = (order) => {
    setSelectedOrders((prevSelectedOrders) => {
      const isSelected = prevSelectedOrders.find((o) => o._id === order._id);
      if (isSelected) {
        return prevSelectedOrders.filter((o) => o._id !== order._id);
      } else {
        return [...prevSelectedOrders, order];
      }
    });
  };

  const handleCheckout = () => {
    if (selectedOrders.length === 0) {
      alert('Pilih setidaknya satu pesanan untuk melanjutkan checkout.');
      return;
    }

    localStorage.setItem('checkoutOrders', JSON.stringify(selectedOrders));
    navigate('/checkout');
  };

  // Handle order update
  const handleUpdateOrder = async (orderId) => {
    const updatedColor = prompt('Masukkan warna baru pesanan:');
    const updatedSize = prompt('Masukkan ukuran baru pesanan:');

    if (!updatedColor || !updatedSize) {
      alert('Warna dan ukuran tidak boleh kosong!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { color: updatedColor, size: updatedSize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Pesanan berhasil diperbarui!');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, color: updatedColor, size: updatedSize } : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Gagal memperbarui pesanan.');
    }
  };

  // Handle order delete
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Pesanan berhasil dihapus!');
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Gagal menghapus pesanan.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="order-page">
      <h1>Pesanan Anda</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="order-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="order-item" key={order._id}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(order)}
                  checked={selectedOrders.some((o) => o._id === order._id)}
                />
                <h2>Produk: {order.productName}</h2>
                <p>Warna: {order.color}</p>
                <p>Ukuran: {order.size}</p>
                <p>Desain: {order.design}</p>
                <p>Jumlah: {order.quantity}</p>
                <p>Harga Total: Rp {order.totalPrice.toLocaleString()}</p>
                {order.file && (
                  <div>
                    <p>
                      File Desain:{' '}
                      <a href={order.file} target="_blank" rel="noopener noreferrer">
                        Lihat File
                      </a>
                    </p>
                  </div>
                )}
                <button
                  className="btn btn-warning"
                  onClick={() => handleUpdateOrder(order._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Hapus
                </button>
              </div>
            ))
          ) : (
            <p>Anda belum memiliki pesanan.</p>
          )}
        </div>
      )}
      <div className="action-buttons">
        <button className="btn-checkout" onClick={handleCheckout}>
          Lanjutkan ke Checkout
        </button>
        <button className="btn-back" onClick={handleBack}>
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
