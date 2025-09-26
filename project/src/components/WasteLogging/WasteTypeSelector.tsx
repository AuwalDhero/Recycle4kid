import React from 'react';

interface WasteType {
  id: string;
  name: string;
  icon: string;
  points_per_kg: number;
  color: string;
  examples: string[];
}

interface WasteTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const wasteTypes: WasteType[] = [
  {
    id: 'plastic',
    name: 'Plastic Bottles',
    icon: '🍼',
    points_per_kg: 50,
    color: 'bg-blue-500',
    examples: ['Water bottles', 'Soda bottles', 'Milk jugs']
  },
  {
    id: 'cans',
    name: 'Aluminum Cans',
    icon: '🥤',
    points_per_kg: 80,
    color: 'bg-gray-500',
    examples: ['Soda cans', 'Juice cans', 'Food cans']
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    icon: '📄',
    points_per_kg: 30,
    color: 'bg-yellow-600',
    examples: ['Notebooks', 'Newspapers', 'Cardboard boxes']
  },
  {
    id: 'glass',
    name: 'Glass Bottles',
    icon: '🫙',
    points_per_kg: 40,
    color: 'bg-green-600',
    examples: ['Glass bottles', 'Jars', 'Glass containers']
  },
  {
    id: 'ewaste',
    name: 'Electronic Waste',
    icon: '📱',
    points_per_kg: 200,
    color: 'bg-purple-600',
    examples: ['Old phones', 'Batteries', 'Small electronics']
  }
];

const WasteTypeSelector: React.FC<WasteTypeSelectorProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">What did you collect?</h3>
      <div className="grid grid-cols-1 gap-3">
        {wasteTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${
              selectedType === type.id
                ? `${type.color} text-white border-transparent shadow-lg transform scale-105`
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-3xl">{type.icon}</div>
            <div className="flex-1 text-left">
              <h4 className={`font-medium ${selectedType === type.id ? 'text-white' : 'text-gray-900'}`}>
                {type.name}
              </h4>
              <p className={`text-sm ${selectedType === type.id ? 'text-gray-100' : 'text-gray-500'}`}>
                {type.points_per_kg} points per kg
              </p>
              <p className={`text-xs ${selectedType === type.id ? 'text-gray-200' : 'text-gray-400'}`}>
                {type.examples.join(', ')}
              </p>
            </div>
            <div className={`font-bold text-lg ${selectedType === type.id ? 'text-white' : 'text-gray-400'}`}>
              {selectedType === type.id ? '✓' : '→'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export { wasteTypes };
export default WasteTypeSelector;