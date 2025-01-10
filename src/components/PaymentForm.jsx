import { useState } from 'react';
import axios from 'axios';
import "./PaymentForm.css";

const PaymentForm = () => {
  const [orderId, setOrderId] = useState('');
  const [method, setMethod] = useState('dana');
  const [amount, setAmount] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setProofImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Membuat FormData untuk mengirim data dan file
    const formData = new FormData();
    formData.append('orderId', orderId);
    formData.append('method', method);
    formData.append('amount', amount);
    if (method !== 'bank_bsi') {
      formData.append('proofImage', proofImage); // Hanya kirim bukti pembayaran jika bukan bank BSI
    }

    try {
      const response = await axios.post('/api/payment/pay', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token dari localStorage
        },
      });

      setMessage(response.data.message); // Menampilkan pesan dari server
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2>Form Pembayaran</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Order ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Metode Pembayaran</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          >
            <option value="dana">Dana</option>
            <option value="shopeepay">ShopeePay</option>
            <option value="gopay">GoPay</option>
            <option value="bank_bsi">Bank BSI</option>
          </select>
        </div>

        <div className="form-group">
          <label>Jumlah Pembayaran</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {method !== 'bank_bsi' && (
          <div className="form-group">
            <label>Bukti Pembayaran</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Kirim Pembayaran'}
        </button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default PaymentForm;
