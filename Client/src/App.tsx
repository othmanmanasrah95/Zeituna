import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WalletProvider } from './contexts/WalletContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import RootsProgram from './pages/RootsProgram';
import AdoptTree from './pages/AdoptTree';
import PlantTree from './pages/PlantTree';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import WalletConnect from './pages/WalletConnect';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import TreeDetail from './pages/TreeDetail';
import LandPlotDetail from './pages/LandPlotDetail';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WalletProvider>
          <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/roots" element={<RootsProgram />} />
                <Route path="/roots/adopt" element={<AdoptTree />} />
                <Route path="/roots/plant" element={<PlantTree />} />
                <Route path="/roots/tree/:id" element={<TreeDetail />} />
                <Route path="/land-plot/:id" element={<LandPlotDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/wallet/connect" element={<WalletConnect />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
          </Router>
        </WalletProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;