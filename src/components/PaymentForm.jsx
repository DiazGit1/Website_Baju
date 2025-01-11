import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const bankAccount = "12334455677890";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !paymentMethod || !paymentProof) {
      setError("Semua kolom harus diisi!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("paymentMethod", paymentMethod);
      if (paymentMethod === "bank") {
        formData.append("bankAccount", bankAccount);
      }
      formData.append("paymentProof", paymentProof);

      // Mengirim data ke backend
      await axios.post("http://localhost:5000/api/payments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Pembayaran berhasil!");
      navigate("/"); // Arahkan ke halaman home
    } catch (err) {
      console.error("Gagal memuat produk:", err);
      setError("Gagal mengirim pembayaran.");
    }
  };

  const handleBack = () => {
    navigate("/"); // Arahkan ke halaman produk
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Form Pembayaran</h2>
        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-blue-100"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>

          {/* Alamat */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-blue-100"
              placeholder="Masukkan alamat Anda"
              required
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Metode Pembayaran
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-blue-100"
              required
            >
              <option value="" disabled>
                Pilih metode pembayaran
              </option>
              <option value="shopeePay">Shopee Pay</option>
              <option value="dana">DANA</option>
              <option value="gopay">GoPay</option>
              <option value="ovo">OVO</option>
              <option value="bank">Bank</option>
            </select>
          </div>

          {/* Nomor Rekening Bank */}
          {paymentMethod === "bank" && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Nomor Rekening Bank: <span className="font-bold text-gray-800">{bankAccount}</span>
              </p>
            </div>
          )}

          {/* Upload Bukti Pembayaran */}
          <div className="mb-4">
            <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700 mb-2">
              Bukti Pembayaran
            </label>
            <input
              type="file"
              id="paymentProof"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-blue-100"
              required
            />
            {paymentProof && (
              <p className="mt-2 text-sm text-gray-600">
                {paymentProof.name} (Klik untuk mengganti)
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          {/* Tombol Pembayaran */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition mb-4"
          >
            Bayar
          </button>

          {/* Tombol Kembali */}
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Kembali
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
