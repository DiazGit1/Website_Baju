import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './OrderPage.css';

const OrderPage = () => {
  const [order, setOrder] = useState({
    color: '',
    size: '',
    design: '',
    quantity: 1,
    totalPrice: 0,
    file: null,
  });

  const pricePerItem = 60000; // Harga per item tetap
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu untuk mengakses halaman ini.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Hitung harga total secara otomatis setiap kali jumlah pesanan berubah
    setOrder((prevOrder) => ({
      ...prevOrder,
      totalPrice: prevOrder.quantity * pricePerItem,
    }));
  }, [order.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: name === 'quantity' ? parseInt(value) : value });
  };

  const handleFileChange = (e) => {
    setOrder({ ...order, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi form
    if (!order.color || !order.size || !order.design || !order.quantity) {
      alert('Mohon isi semua field kecuali unggahan file.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
  
      // Buat objek pesanan baru dengan data lengkap
      const newOrder = {
        id: Date.now().toString(), // ID unik untuk pesanan
        color: order.color,
        size: order.size,
        design: order.design,
        quantity: order.quantity,
        totalPrice: order.quantity * pricePerItem,
        file: order.file ? URL.createObjectURL(order.file) : null, // Simpan URL file
      };
      
      // Ambil data pesanan yang sudah ada dari localStorage
      const existingOrders = JSON.parse(localStorage.getItem('checkoutOrders')) || [];
      
      // Tambahkan pesanan baru ke dalam array
      const updatedOrders = [...existingOrders, newOrder];
      
      // Simpan kembali seluruh array pesanan (termasuk pesanan baru) ke localStorage
      localStorage.setItem('checkoutOrders', JSON.stringify(updatedOrders));
  
      console.log('Pesanan baru disimpan:', newOrder);
      console.log('Semua pesanan:', updatedOrders);
  
      // Kirim permintaan ke API (opsional)
      const formData = new FormData();
      formData.append('color', order.color);
      formData.append('size', order.size);
      formData.append('design', order.design);
      formData.append('quantity', String(order.quantity));
      formData.append('totalPrice', String(newOrder.totalPrice));
      if (order.file) {
        formData.append('file', order.file);
      }
  
      await API.post('/api/orders', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert('Pesanan berhasil dibuat!');
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Gagal membuat pesanan.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="order-page">
      <div className="container">
        <div className="order-form-wrapper">
          <h2 className="text-center mb-4">Buat Pesanan</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="form-group col-lg-6">
                <label htmlFor="color">Warna</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Masukkan warna kaos"
                  value={order.color}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group col-lg-6">
                <label htmlFor="size">Ukuran</label>
                <select
                  id="size"
                  name="size"
                  value={order.size}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Pilih ukuran</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="design">Desain</label>
              <textarea
                id="design"
                name="design"
                placeholder="Deskripsi desain (contoh: logo, tulisan)"
                value={order.design}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
            </div>
            <div className="row mb-4">
              <div className="form-group col-lg-6">
                <label htmlFor="quantity">Jumlah</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Jumlah pesanan"
                  value={order.quantity}
                  onChange={handleChange}
                  className="form-control"
                  min="1"
                  required
                />
              </div>
              <div className="form-group col-lg-6">
                <label htmlFor="totalPrice">Harga Total</label>
                <input
                  type="number"
                  id="totalPrice"
                  name="totalPrice"
                  value={order.totalPrice}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="file">Unggah File</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">
              Kirim Pesanan
            </button>
            {/* Tombol Kembali */}
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary w-100"
            >
              Kembali
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
