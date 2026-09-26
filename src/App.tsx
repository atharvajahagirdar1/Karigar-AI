import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './store';
import { AppShell } from './components/layout/AppShell';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Catalog } from './pages/Catalog';
import { AddProduct } from './pages/AddProduct';
import { ProductDetail } from './pages/ProductDetail';
import { FindBuyers } from './pages/FindBuyers';
import { Buyers } from './pages/Buyers';
import { BuyerDetail } from './pages/BuyerDetail';
import { Orders } from './pages/Orders';
import { Analytics } from './pages/Analytics';
import { Assistant } from './pages/Assistant';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppShell>{children}</AppShell>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
      <Route path="/catalog/new" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
      <Route path="/catalog/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
      
      <Route path="/find-buyers" element={<ProtectedRoute><FindBuyers /></ProtectedRoute>} />
      <Route path="/buyers" element={<ProtectedRoute><Buyers /></ProtectedRoute>} />
      <Route path="/buyers/:id" element={<ProtectedRoute><BuyerDetail /></ProtectedRoute>} />
      
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
