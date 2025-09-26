import React from 'react';
import { Sparkles, Heart, Droplets } from 'lucide-react';

interface ImpactBannerProps {
  totalWaste: number;
  co2Saved: number;
  childrenImpacted: number;
}

const ImpactBanner: React.FC<ImpactBannerProps> = ({ totalWaste, co2Saved, childrenImpacted }) => {
  const getImpactMessage = () => {
    if (totalWaste >= 50) {
      return `Amazing! You've collected enough plastic to protect ${Math.floor(totalWaste / 5)} children's water bottles! 🌟`;
    } else if (totalWaste >= 20) {
      return `Great work! You've saved enough materials to make ${Math.floor(totalWaste / 2)} school notebooks! 📚`;
    } else if (totalWaste >= 5) {
      return `Good start! You've collected enough to prevent 1 plastic bottle from reaching the ocean! 🌊`;
    }
    return "Every piece of waste you collect makes a difference! Keep going! 💪";
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-6 h-6 text-yellow-200" />
        <h3 className="text-lg font-bold">Your Environmental Impact</h3>
      </div>
      
      <p className="text-lg mb-4 leading-relaxed">{getImpactMessage()}</p>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-center mb-1">
            <Heart className="w-5 h-5 text-red-200" />
          </div>
          <p className="text-2xl font-bold">{childrenImpacted}</p>
          <p className="text-sm opacity-90">Kids Helped</p>
        </div>
        
        <div className="text-center bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-center mb-1">
            <Droplets className="w-5 h-5 text-blue-200" />
          </div>
          <p className="text-2xl font-bold">{co2Saved}kg</p>
          <p className="text-sm opacity-90">CO₂ Saved</p>
        </div>
        
        <div className="text-center bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-center mb-1">
            <span className="text-lg">♻️</span>
          </div>
          <p className="text-2xl font-bold">{totalWaste}kg</p>
          <p className="text-sm opacity-90">Total Waste</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;