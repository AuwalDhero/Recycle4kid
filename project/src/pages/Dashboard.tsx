import React from 'react';
import { Recycle, TrendingUp, Award, Users, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/Dashboard/StatsCard';
import ImpactBanner from '../components/Dashboard/ImpactBanner';
import BadgeDisplay from '../components/Dashboard/BadgeDisplay';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in real app, this would come from Supabase
  const mockStats = {
    totalWaste: 45.5,
    thisWeekWaste: 8.2,
    co2Saved: 23.7,
    childrenImpacted: 12,
    weeklyGoal: 10,
    daysActive: 15,
    communityRank: 23
  };

  const recentActivity = [
    { id: 1, type: 'plastic', amount: 2.5, points: 125, time: '2 hours ago', message: 'Great job collecting plastic bottles!' },
    { id: 2, type: 'cans', amount: 1.8, points: 144, time: '1 day ago', message: 'Aluminum cans make a big difference!' },
    { id: 3, type: 'paper', amount: 5.0, points: 150, time: '2 days ago', message: 'Paper recycling saves trees!' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'plastic': return '🍼';
      case 'cans': return '🥤';
      case 'paper': return '📄';
      case 'glass': return '🫙';
      case 'ewaste': return '📱';
      default: return '♻️';
    }
  };

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'child':
        return (
          <>
            <ImpactBanner 
              totalWaste={mockStats.totalWaste}
              co2Saved={mockStats.co2Saved}
              childrenImpacted={mockStats.childrenImpacted}
            />
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatsCard
                title="This Week"
                value={`${mockStats.thisWeekWaste}kg`}
                icon={Calendar}
                color="green"
                subtitle="Recycled"
                trend={{ value: "+15%", isPositive: true }}
              />
              <StatsCard
                title="Weekly Goal"
                value={`${Math.round((mockStats.thisWeekWaste / mockStats.weeklyGoal) * 100)}%`}
                icon={TrendingUp}
                color="blue"
                subtitle={`${mockStats.thisWeekWaste}/${mockStats.weeklyGoal}kg`}
              />
            </div>

            <BadgeDisplay badges={user.badges || []} userPoints={user.points} />
          </>
        );

      case 'school':
        return (
          <>
            <div className="bg-purple-500 rounded-xl p-6 text-white shadow-lg mb-6">
              <h3 className="text-lg font-bold mb-2">🏫 {user.school_name || user.name}</h3>
              <p className="text-purple-100 mb-4">Leading the way in environmental education!</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">847kg</p>
                  <p className="text-sm opacity-90">School Total</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm opacity-90">Students Active</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatsCard
                title="Community Rank"
                value={`#${mockStats.communityRank}`}
                icon={Award}
                color="purple"
                trend={{ value: "+5 places", isPositive: true }}
              />
              <StatsCard
                title="Active Days"
                value={mockStats.daysActive}
                icon={Calendar}
                color="green"
                subtitle="This month"
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <ImpactBanner 
              totalWaste={mockStats.totalWaste}
              co2Saved={mockStats.co2Saved}
              childrenImpacted={mockStats.childrenImpacted}
            />
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatsCard
                title="Total Collected"
                value={`${mockStats.totalWaste}kg`}
                icon={Recycle}
                color="green"
                trend={{ value: "+2.3kg", isPositive: true }}
              />
              <StatsCard
                title="Community Rank"
                value={`#${mockStats.communityRank}`}
                icon={Users}
                color="blue"
                trend={{ value: "+5", isPositive: true }}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {getDashboardContent()}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{activity.amount}kg collected</p>
                  <span className="text-green-600 font-bold">+{activity.points} pts</span>
                </div>
                <p className="text-sm text-gray-600">{activity.message}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;