import React, { useState } from 'react';
import { BarChart, Users, School, TrendingUp, Download, Settings, AlertTriangle } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'data' | 'settings'>('overview');

  // Mock admin data
  const adminStats = {
    totalUsers: 2450,
    totalWaste: 15670,
    totalPoints: 782400,
    activeSchools: 45,
    monthlyGrowth: 23.5,
    co2Saved: 8934,
    childrenImpacted: 1567
  };

  const recentUsers = [
    { id: 1, name: 'Green Valley School', role: 'school', joined: '2 hours ago', points: 3420 },
    { id: 2, name: 'Emma Green', role: 'child', joined: '5 hours ago', points: 150 },
    { id: 3, name: 'Johnson Family', role: 'family', joined: '1 day ago', points: 890 },
    { id: 4, name: 'Hope Elementary', role: 'school', joined: '2 days ago', points: 2100 }
  ];

  const wasteData = [
    { type: 'Plastic', amount: 6800, percentage: 43 },
    { type: 'Aluminum', amount: 3200, percentage: 20 },
    { type: 'Paper', amount: 2900, percentage: 18 },
    { type: 'Glass', amount: 1870, percentage: 12 },
    { type: 'E-waste', amount: 900, percentage: 7 }
  ];

  const exportData = () => {
    alert('Exporting data to CSV...');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Total Users"
          value={adminStats.totalUsers.toLocaleString()}
          icon={Users}
          color="blue"
          trend={{ value: `+${adminStats.monthlyGrowth}%`, isPositive: true }}
        />
        <StatsCard
          title="Active Schools"
          value={adminStats.activeSchools}
          icon={School}
          color="purple"
          trend={{ value: "+3 this week", isPositive: true }}
        />
        <StatsCard
          title="Total Waste"
          value={`${(adminStats.totalWaste / 1000).toFixed(1)}t`}
          icon={TrendingUp}
          color="green"
          subtitle="Collected"
        />
        <StatsCard
          title="CO₂ Saved"
          value={`${(adminStats.co2Saved / 1000).toFixed(1)}t`}
          icon={BarChart}
          color="orange"
          subtitle="This year"
        />
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">🌍 Environmental Impact Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-2xl font-bold">{adminStats.childrenImpacted.toLocaleString()}</p>
            <p className="text-sm opacity-90">Children Impacted</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-2xl font-bold">{(adminStats.totalWaste / 1000).toFixed(1)}t</p>
            <p className="text-sm opacity-90">Waste Diverted</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-2xl font-bold">{(adminStats.co2Saved / 1000).toFixed(1)}t</p>
            <p className="text-sm opacity-90">CO₂ Prevented</p>
          </div>
        </div>
      </div>

      {/* Waste Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Waste Collection Breakdown</h3>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {wasteData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded" style={{ 
                  backgroundColor: ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][index] 
                }}></div>
                <span className="font-medium text-gray-900">{item.type}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{item.amount.toLocaleString()}kg</p>
                <p className="text-xs text-gray-500">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Registrations</h3>
        <div className="space-y-3">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'school' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'family' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                  <span>{user.joined}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'data', label: 'Data Export', icon: Download },
    { key: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-gray-300">
          Manage Recycle4Life Kids platform and monitor environmental impact
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-2 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'data' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Export</h3>
            <p className="text-gray-600 mb-6">Export recycling data and analytics reports</p>
            <div className="space-y-3 max-w-xs mx-auto">
              <button
                onClick={exportData}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Export All Data (CSV)
              </button>
              <button
                onClick={exportData}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Export Impact Report (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600">Configure platform settings and preferences</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;