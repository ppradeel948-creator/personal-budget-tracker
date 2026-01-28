import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationCenter from './components/NotificationCenter';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Goals from './pages/Goals';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Integration from './pages/Integration';

import './App.css';
import './styles/modern-theme.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
            <div className="app-background"></div>
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/transactions" element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                } />
                <Route path="/budgets" element={
                  <ProtectedRoute>
                    <Budgets />
                  </ProtectedRoute>
                } />
                <Route path="/goals" element={
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/integration" element={
                  <ProtectedRoute>
                    <Integration />
                  </ProtectedRoute>
                } />

              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;