import React from 'react';
import { Trophy, Medal, Award, Users, School, User } from 'lucide-react';
import { LeaderboardEntry } from '../../types';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  currentUserId?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entry, currentUserId }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-yellow-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{rank}</div>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school':
        return <School className="w-5 h-5" />;
      case 'family':
        return <Users className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3:
        return 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  const isCurrentUser = entry.id === currentUserId;

  return (
    <div
      className={`rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
        isCurrentUser ? 'ring-2 ring-green-500 bg-green-50' : getRankColor(entry.rank)
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center">
            {getRankIcon(entry.rank)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              {getTypeIcon(entry.type)}
              <h3 className={`font-semibold ${
                entry.rank <= 3 && !isCurrentUser ? 'text-white' : 'text-gray-900'
              }`}>
                {entry.name}
                {isCurrentUser && <span className="text-green-600 ml-2">(You)</span>}
              </h3>
            </div>
            <p className={`text-sm ${
              entry.rank <= 3 && !isCurrentUser ? 'text-white opacity-90' : 'text-gray-600'
            }`}>
              {entry.total_waste}kg collected
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className={`text-lg font-bold ${
            entry.rank <= 3 && !isCurrentUser ? 'text-white' : 'text-gray-900'
          }`}>
            {entry.points.toLocaleString()}
          </p>
          <p className={`text-xs ${
            entry.rank <= 3 && !isCurrentUser ? 'text-white opacity-75' : 'text-gray-500'
          }`}>
            eco-points
          </p>
        </div>
      </div>

      {entry.rank <= 3 && (
        <div className="mt-3 pt-3 border-t border-white border-opacity-20">
          <div className="flex items-center justify-center">
            <span className={`text-xs font-medium ${
              isCurrentUser ? 'text-green-600' : 'text-white opacity-90'
            }`}>
              🏆 Top {entry.rank} {entry.type === 'school' ? 'School' : entry.type === 'family' ? 'Family' : 'Individual'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardCard;