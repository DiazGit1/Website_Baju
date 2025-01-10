import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const RegisterPage = () => {
  const [fullName, setFullname] = useState(''); // Use fullName instead of name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        fullName, // Send fullName instead of name
        email,
        password,
      });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Arahkan ke halaman login setelah 2 detik
      }, 2000);
    } catch (err) {
      console.error('Registration failed:', err); // Tambahkan log error
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Full Name</label> {/* Update label to Full Name */}
          <input
            type="text"
            className="form-control"
            value={fullName} // Use fullName instead of name
            onChange={(e) => setFullname(e.target.value)} // Update setter to setFullname
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
