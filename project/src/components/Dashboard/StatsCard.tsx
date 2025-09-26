import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, subtitle, trend }) => {
  const colorClasses = {
    green: 'bg-green-500 text-green-600 bg-green-50',
    blue: 'bg-blue-500 text-blue-600 bg-blue-50',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50',
    orange: 'bg-orange-500 text-orange-600 bg-orange-50',
    red: 'bg-red-500 text-red-600 bg-red-50'
  };

  const [bgClass, textClass, lightBgClass] = (colorClasses[color as keyof typeof colorClasses] || colorClasses.green).split(' ');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {trend && (
            <div className={`inline-flex items-center text-xs font-medium mt-2 ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span className="ml-1">{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${lightBgClass}`}>
          <Icon className={`w-6 h-6 ${textClass}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;