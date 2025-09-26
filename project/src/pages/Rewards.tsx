import React, { useState } from 'react';
import { Gift, Phone, Book, Heart, Star } from 'lucide-react';
import { Reward } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Rewards: React.FC = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'airtime' | 'school_supplies' | 'health'>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const rewards: Reward[] = [
    {
      id: '1',
      name: 'MTN Airtime ₦200',
      description: 'Get ₦200 MTN airtime credit for your phone',
      points_cost: 400,
      category: 'airtime',
      image_url: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true
    },
    {
      id: '2',
      name: 'Notebook Set',
      description: '5 exercise books perfect for school use',
      points_cost: 300,
      category: 'school_supplies',
      image_url: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true
    },
    {
      id: '3',
      name: 'Glo Airtime ₦500',
      description: 'Get ₦500 Glo airtime credit for your phone',
      points_cost: 950,
      category: 'airtime',
      image_url: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true
    },
    {
      id: '4',
      name: 'Water Purification Tablets',
      description: '30-day supply of water purification tablets',
      points_cost: 600,
      category: 'health',
      image_url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true
    },
    {
      id: '5',
      name: 'Pencil Case + Stationery',
      description: 'Complete pencil case with pens, pencils, and erasers',
      points_cost: 450,
      category: 'school_supplies',
      image_url: 'https://images.pexels.com/photos/159740/school-school-supplies-stationery-159740.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true
    },
    {
      id: '6',
      name: 'First Aid Kit',
      description: 'Basic first aid kit for family use',
      points_cost: 800,
      category: 'health',
      image_url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Rewards', icon: Gift, color: 'text-gray-600' },
    { key: 'airtime', label: 'Airtime', icon: Phone, color: 'text-blue-600' },
    { key: 'school_supplies', label: 'School Items', icon: Book, color: 'text-green-600' },
    { key: 'health', label: 'Health', icon: Heart, color: 'text-red-600' }
  ];

  const filteredRewards = rewards.filter(reward => {
    if (activeCategory === 'all') return true;
    return reward.category === activeCategory;
  });

  const canAfford = (pointsCost: number) => {
    return (user?.points || 0) >= pointsCost;
  };

  const handleRedeem = (reward: Reward) => {
    if (!canAfford(reward.points_cost) || !reward.available) return;
    setSelectedReward(reward);
  };

  const confirmRedemption = () => {
    if (!selectedReward) return;
    
    // In real app, this would call Supabase to process the redemption
    alert(`Successfully redeemed ${selectedReward.name}! You'll receive instructions shortly.`);
    setSelectedReward(null);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Gift className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Rewards Store</h1>
            </div>
            <p className="text-orange-100">
              Redeem your eco-points for amazing rewards!
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90">Your Points</p>
            <p className="text-3xl font-bold">{(user?.points || 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.key;
            const count = category.key === 'all' ? rewards.length : rewards.filter(r => r.category === category.key).length;
            
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key as typeof activeCategory)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : category.color}`} />
                  <span className="font-medium">{category.label}</span>
                </div>
                <span className={`text-sm ${isActive ? 'text-orange-600' : 'text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRewards.map((reward) => {
          const affordable = canAfford(reward.points_cost);
          
          return (
            <div
              key={reward.id}
              className={`bg-white rounded-xl shadow-sm border p-4 transition-all ${
                reward.available
                  ? 'border-gray-100 hover:shadow-md'
                  : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={reward.image_url}
                  alt={reward.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">{reward.points_cost.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">points</span>
                    </div>
                    
                    {!reward.available ? (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    ) : !affordable ? (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        Need {(reward.points_cost - (user?.points || 0)).toLocaleString()} more
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRedeem(reward)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      >
                        Redeem
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No rewards found in this category</p>
        </div>
      )}

      {/* Redemption Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Redemption</h3>
            
            <div className="text-center mb-6">
              <img
                src={selectedReward.image_url}
                alt={selectedReward.name}
                className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
              />
              <h4 className="font-semibold text-gray-900">{selectedReward.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedReward.description}</p>
              
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  This will cost <span className="font-bold text-orange-600">{selectedReward.points_cost} points</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Remaining: {((user?.points || 0) - selectedReward.points_cost).toLocaleString()} points
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedReward(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedemption}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Redeem Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;