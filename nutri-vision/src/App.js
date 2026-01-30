import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { MealsProvider } from './context/MealsContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import FoodCategory from './pages/FoodCategory/FoodCategory';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import Profile from './pages/Profile/Profile';
import Goals from './pages/Goals/Goals';
import TodaysMeals from './pages/TodaysMeals/TodaysMeals';
import Analytics from './pages/Analytics/Analytics';
import AIChat from './pages/AIChat/AIChat';
import QRCodePage from './pages/QRCode/QRCode';
import FoodScanner from './pages/FoodScanner/FoodScanner';
import BarcodeScanner from './pages/BarcodeScanner/BarcodeScanner';
import MealPlanner from './pages/MealPlanner/MealPlanner';
import NotificationSettings from './pages/Notifications/NotificationSettings';
import ProgressPhotos from './pages/ProgressPhotos/ProgressPhotos';
import ScanHistory from './pages/ScanHistory/ScanHistory';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <MealsProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="food-category/:categoryId" element={<FoodCategory />} />
                <Route path="food/:foodId" element={<FoodDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="goals" element={<Goals />} />
                <Route path="todays-meals" element={<TodaysMeals />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="ai-chat" element={<AIChat />} />
                <Route path="qr-code" element={<QRCodePage />} />
                <Route path="scan-food" element={<FoodScanner />} />
                <Route path="barcode-scanner" element={<BarcodeScanner />} />
                <Route path="meal-planner" element={<MealPlanner />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="progress-photos" element={<ProgressPhotos />} />
                <Route path="scan-history" element={<ScanHistory />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </MealsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
