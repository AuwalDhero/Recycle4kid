import React from 'react';
import { Home, Plus, Trophy, BookOpen, Gift, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Home', icon: Home },
      { id: 'log', label: 'Log Waste', icon: Plus },
      { id: 'leaderboard', label: 'Rankings', icon: Trophy },
    ];

    if (user?.role === 'child' || user?.role === 'family') {
      baseItems.push(
        { id: 'learning', label: 'Learn', icon: BookOpen },
        { id: 'rewards', label: 'Rewards', icon: Gift }
      );
    }

    if (user?.role === 'admin') {
      baseItems.push(
        { id: 'admin', label: 'Admin', icon: Settings }
      );
    }

    return baseItems;
  };

  return (
    <nav className="bg-white shadow-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-sm mx-auto">
        {getNavItems().map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-500 hover:bg-green-25'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
        
        <button
          onClick={logout}
          className="flex flex-col items-center space-y-1 px-2 py-1 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;