import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg w-64 p-6">
        <h1 className="text-xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">home</span> Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">login</span> Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">person_add</span> Register
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">dashboard</span> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">inventory</span> Products
              </Link>
            </li>
            <li>
              <Link
                to="/order"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">shopping_cart</span> Order
              </Link>
            </li>
            <li>
              <Link
                to="/list"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">list</span> List
              </Link>
            </li>
            <li>
              <Link
                to="/order/list"
                className="flex items-center text-gray-600 hover:text-blue-500 transition"
              >
                <span className="material-icons mr-2">assignment</span> Order List
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="bg-blue-500 text-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
          <p className="text-sm">Manage your website from this dashboard.</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Statistics</h3>
            {/* Add statistics content */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Recent Orders</h3>
            {/* Add recent orders content */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
