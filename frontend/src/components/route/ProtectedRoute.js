import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layouts/Loader';

export default function ProtectedRoute({ children, isAdmin }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.authState);

  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated but not an admin, redirect to home page
  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // If all checks pass, render the protected route's children
  return children;
}
