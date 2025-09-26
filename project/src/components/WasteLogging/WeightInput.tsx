import React, { useState } from 'react';
import { Scale } from 'lucide-react';

interface WeightInputProps {
  weight: number;
  onWeightChange: (weight: number) => void;
  wasteType: string;
}

const WeightInput: React.FC<WeightInputProps> = ({ weight, onWeightChange, wasteType }) => {
  const [inputMethod, setInputMethod] = useState<'slider' | 'manual'>('slider');

  const presetWeights = [0.5, 1, 2, 5, 10, 20];

  const getWeightSuggestion = () => {
    switch (wasteType) {
      case 'plastic':
        return 'Tip: A typical plastic bottle weighs about 0.5kg';
      case 'cans':
        return 'Tip: A standard aluminum can weighs about 0.3kg';
      case 'paper':
        return 'Tip: A stack of 20 papers weighs about 1kg';
      case 'glass':
        return 'Tip: A glass bottle weighs about 1-2kg';
      case 'ewaste':
        return 'Tip: An old phone weighs about 0.2kg';
      default:
        return 'Enter the weight of items you collected';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Scale className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">How much did you collect?</h3>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-blue-700 text-sm">{getWeightSuggestion()}</p>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setInputMethod('slider')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            inputMethod === 'slider'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Quick Select
        </button>
        <button
          onClick={() => setInputMethod('manual')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            inputMethod === 'manual'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Manual Entry
        </button>
      </div>

      {inputMethod === 'slider' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {presetWeights.map((presetWeight) => (
              <button
                key={presetWeight}
                onClick={() => onWeightChange(presetWeight)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  weight === presetWeight
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {presetWeight}kg
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>0kg</span>
              <span className="font-medium">{weight}kg</span>
              <span>50kg</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={weight}
              onChange={(e) => onWeightChange(parseFloat(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none slider"
              style={{
                background: `linear-gradient(to right, #22C55E 0%, #22C55E ${(weight / 50) * 100}%, #E5E7EB ${(weight / 50) * 100}%, #E5E7EB 100%)`
              }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter exact weight (kg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => onWeightChange(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-medium"
              placeholder="0.0"
            />
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-green-700 font-medium">Total Weight:</span>
          <span className="text-2xl font-bold text-green-800">{weight}kg</span>
        </div>
      </div>
    </div>
  );
};

export default WeightInput;