import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import WasteLogging from './pages/WasteLogging';
import Leaderboard from './pages/Leaderboard';
import LearningZone from './pages/LearningZone';
import Rewards from './pages/Rewards';
import AdminPanel from './pages/AdminPanel';

const AuthScreen: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-3xl">♻️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recycle4Life Kids</h1>
          <p className="text-gray-600">
            Join Nigeria's kids in creating a cleaner, healthier planet
          </p>
          <p className="text-sm text-green-600 font-medium mt-1">
            Powered by AuwalheroVentures
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          {authMode === 'login' ? (
            <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🌍 Making recycling fun for Nigerian children</p>
          <p>🎯 Supporting UNICEF's Climate Innovation Challenge</p>
        </div>
      </div>
    </div>
  );
};

const MainApp: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Recycle4Life Kids...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'log':
        return <WasteLogging />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'learning':
        return <LearningZone />;
      case 'rewards':
        return <Rewards />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-screen-sm mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;