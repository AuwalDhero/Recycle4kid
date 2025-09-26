import React from 'react';
import { Award, Star } from 'lucide-react';
import { Badge } from '../../types';

interface BadgeDisplayProps {
  badges: Badge[];
  userPoints: number;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges, userPoints }) => {
  const allBadges = [
    { id: '1', name: 'First Steps', description: 'Logged your first recyclable', icon: '🌱', points_required: 0 },
    { id: '2', name: 'Eco Warrior', description: 'Collected 10kg of recyclables', icon: '♻️', points_required: 500 },
    { id: '3', name: 'Green Champion', description: 'Earned 1000 eco-points', icon: '🏆', points_required: 1000 },
    { id: '4', name: 'Planet Protector', description: 'Collected 50kg of recyclables', icon: '🌍', points_required: 2500 },
    { id: '5', name: 'Recycling Master', description: 'Earned 5000 eco-points', icon: '🎖️', points_required: 5000 }
  ];

  const earnedBadgeIds = badges.map(b => b.id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Badges & Achievements</h3>
        </div>
        <span className="text-sm text-gray-500">{badges.length}/{allBadges.length}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {allBadges.map((badge) => {
          const isEarned = earnedBadgeIds.includes(badge.id);
          const canEarn = userPoints >= badge.points_required && !isEarned;

          return (
            <div
              key={badge.id}
              className={`relative rounded-lg border-2 p-3 text-center transition-all ${
                isEarned
                  ? 'border-yellow-300 bg-yellow-50 shadow-sm'
                  : canEarn
                  ? 'border-green-300 bg-green-50 animate-pulse'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {isEarned && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
              )}
              
              <div className="text-2xl mb-2">{badge.icon}</div>
              <p className={`text-xs font-medium mb-1 ${
                isEarned ? 'text-yellow-700' : canEarn ? 'text-green-700' : 'text-gray-500'
              }`}>
                {badge.name}
              </p>
              <p className={`text-xs ${
                isEarned ? 'text-yellow-600' : canEarn ? 'text-green-600' : 'text-gray-400'
              }`}>
                {badge.points_required} pts
              </p>
              
              {canEarn && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90 rounded-lg">
                  <p className="text-white text-xs font-bold">Ready to Claim!</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeDisplay;