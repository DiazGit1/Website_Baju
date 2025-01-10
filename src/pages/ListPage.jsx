import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListPage.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data pesanan');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-page container mt-5">
      <h2 className="text-center mb-4">Daftar Pesanan</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Pemesan</th>
              <th scope="col">Warna</th>
              <th scope="col">Ukuran</th>
              <th scope="col">Desain</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Total Harga</th>
              <th scope="col">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.user?.fullName || "Tidak diketahui"}</td> {/* Nama pengguna dari API */}
                  <td>{order.color}</td>
                  <td>{order.size}</td>
                  <td>{order.design}</td>
                  <td>{order.quantity}</td>
                  <td>Rp {order.totalPrice.toLocaleString()}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Tidak ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
