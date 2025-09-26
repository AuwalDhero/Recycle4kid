import React, { useState } from 'react';
import { Trophy, Filter, Users, School, User } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import LeaderboardCard from '../components/Leaderboard/LeaderboardCard';
import { useAuth } from '../contexts/AuthContext';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'all' | 'individual' | 'family' | 'school'>('all');

  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', name: 'Green Valley Primary School', points: 8520, rank: 1, type: 'school', total_waste: 170.4 },
    { id: '2', name: 'The Johnson Family', points: 5280, rank: 2, type: 'family', total_waste: 105.6 },
    { id: '3', name: 'Emma Green', points: 4150, rank: 3, type: 'individual', total_waste: 83.0 },
    { id: '4', name: 'Sunrise Academy', points: 3890, rank: 4, type: 'school', total_waste: 77.8 },
    { id: '5', name: 'The Williams Family', points: 3520, rank: 5, type: 'family', total_waste: 70.4 },
    { id: '6', name: 'Michael Eco', points: 2980, rank: 6, type: 'individual', total_waste: 59.6 },
    { id: '7', name: 'Hope Elementary', points: 2750, rank: 7, type: 'school', total_waste: 55.0 },
    { id: '8', name: 'Sarah Planet', points: 2340, rank: 8, type: 'individual', total_waste: 46.8 },
    { id: '9', name: 'The Brown Family', points: 2150, rank: 9, type: 'family', total_waste: 43.0 },
    { id: '10', name: 'David Nature', points: 1950, rank: 10, type: 'individual', total_waste: 39.0 }
  ];

  const filteredData = leaderboardData.filter(entry => {
    if (activeFilter === 'all') return true;
    return entry.type === activeFilter;
  });

  const filters = [
    { key: 'all', label: 'All', icon: Filter },
    { key: 'individual', label: 'Individual', icon: User },
    { key: 'family', label: 'Families', icon: Users },
    { key: 'school', label: 'Schools', icon: School }
  ];

  const getFilterStats = () => {
    const stats = {
      all: leaderboardData.length,
      individual: leaderboardData.filter(e => e.type === 'individual').length,
      family: leaderboardData.filter(e => e.type === 'family').length,
      school: leaderboardData.filter(e => e.type === 'school').length
    };
    return stats;
  };

  const filterStats = getFilterStats();
  const currentUserEntry = leaderboardData.find(entry => entry.name === user?.name);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-yellow-100">
          Compete with families and schools across Nigeria to create a cleaner environment!
        </p>
        
        {currentUserEntry && (
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-sm opacity-90">Your Current Rank</p>
            <p className="text-xl font-bold">#{currentUserEntry.rank}</p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Filter Rankings</h3>
        <div className="grid grid-cols-2 gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const count = filterStats[filter.key as keyof typeof filterStats];
            const isActive = activeFilter === filter.key;
            
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isActive
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{filter.label}</span>
                </div>
                <span className={`text-sm ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeFilter === 'all' ? 'Top Performers' : `Top ${filters.find(f => f.key === activeFilter)?.label}`}
          </h3>
          <span className="text-sm text-gray-500">{filteredData.length} entries</span>
        </div>

        {filteredData.map((entry, index) => (
          <LeaderboardCard
            key={entry.id}
            entry={{ ...entry, rank: index + 1 }}
            currentUserId={user?.id}
          />
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No entries found for this category</p>
          <p className="text-gray-400">Be the first to start recycling!</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;