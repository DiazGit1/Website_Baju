import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser'; // Import useUser hook
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Access the user context and setUser function from the context
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('https://websitebaju.vercel.app/login', {
        email,
        password,
      });

      const { token, role, fullName, redirectTo } = data; // Ambil fullName dari response

      // Update the context with user data
      setUser({ token, role, fullName });

      // Simpan token, role, fullName, dan email ke localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('fullName', fullName); // Simpan fullName
      localStorage.setItem('email', email);

      console.log("Data tersimpan di localStorage:", {
        fullName: localStorage.getItem("fullName"),
        email: localStorage.getItem("email"),
      });

      // Tambahkan console log untuk verifikasi
      console.log('Token saved to localStorage:', localStorage.getItem('token'));
      console.log('Role saved to localStorage:', localStorage.getItem('role'));
      console.log('fullName saved to localStorage:', localStorage.getItem('fullName'));
      console.log('Email saved to localStorage:', localStorage.getItem('email'));

      // Redirect ke halaman berdasarkan role
      navigate(redirectTo); // Gunakan lokasi yang diberikan oleh backend
    } catch (err) {
      console.error('Login gagal:', err);
      setError(
        err.response?.data?.message ||
        (err.response?.status === 401
          ? 'Email atau password salah.'
          : 'Terjadi kesalahan. Coba lagi.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="register-link">
          Belum punya akun? <a href="/register">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
