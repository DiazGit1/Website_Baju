import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API from '../api'; // Menggunakan module API
import './OrderListPage.css'; // Tambahkan styling CSS jika diperlukan

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inisialisasi navigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");

        const response = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pesanan:", error);
        alert(error.response?.data?.message || "Gagal mengambil data pesanan.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Memuat data pesanan...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-4">
        <p>Belum ada pesanan yang dibuat.</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="order-list container py-4">
      <h2 className="text-center mb-4">Daftar Pesanan</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID Pesanan</th>
              <th>Warna</th>
              <th>Ukuran</th>
              <th>Desain</th>
              <th>Jumlah</th>
              <th>Total Harga</th>
              <th>File</th>
              <th>Tanggal Pemesanan</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.color}</td>
                <td>{order.size}</td>
                <td>{order.design}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.file ? (
                    <a
                      href={order.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat File
                    </a>
                  ) : (
                    "Tidak ada file"
                  )}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    </div>
  );
};

export default OrderList;
