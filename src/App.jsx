import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserProvider'; // Import UserProvider

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import ListPage from './pages/ListPage';
import OrderListPage from './pages/OrderListPage';
import AdminPage from './pages/AdminPage';
import AdminPage1 from './pages/AdminPage1';
import ProfilPage from './pages/ProfilPage';
import PaymentForm from './components/PaymentForm';
import CheckoutPage from './pages/CheckoutPage';

// Import ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider> {/* Wrapping the app with UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['user', 'admin']}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Other routes */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/order/list" element={<OrderListPage />} />
          <Route path="/admin1" element={<AdminPage1 />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
