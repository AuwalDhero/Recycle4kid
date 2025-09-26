import React from 'react';
import { Leaf, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'child': return 'text-blue-600 bg-blue-100';
      case 'family': return 'text-green-600 bg-green-100';
      case 'school': return 'text-purple-600 bg-purple-100';
      case 'admin': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg">
      <div className="max-w-screen-sm mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Leaf className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Recycle4Life Kids</h1>
              <p className="text-sm opacity-90">AuwalheroVentures</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role || '')}`}>
                {user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)}
              </div>
            </div>
            <button className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {user && (
          <div className="mt-3 flex items-center justify-between bg-white bg-opacity-20 rounded-lg px-3 py-2">
            <div>
              <span className="text-sm opacity-90">Eco-Points</span>
              <p className="text-xl font-bold">{user.points.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm opacity-90">Badges</span>
              <p className="text-xl font-bold">{user.badges?.length || 0}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;