import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/api';

function AdminDashboard() {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
    </div>
  );
}

export default AdminDashboard;
