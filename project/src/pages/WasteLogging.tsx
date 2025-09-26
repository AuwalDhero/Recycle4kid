import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import WasteTypeSelector, { wasteTypes } from '../components/WasteLogging/WasteTypeSelector';
import WeightInput from '../components/WasteLogging/WeightInput';

const WasteLogging: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedWasteType = wasteTypes.find(t => t.id === selectedType);
  const totalPoints = selectedWasteType ? Math.round(weight * selectedWasteType.points_per_kg) : 0;

  const getImpactMessage = () => {
    if (selectedType === 'plastic' && weight >= 2) {
      return `Amazing! You've collected enough plastic to protect ${Math.floor(weight * 2)} children's water bottles from pollution! 🌊`;
    } else if (selectedType === 'cans' && weight >= 1) {
      return `Great work! You've saved enough aluminum to make ${Math.floor(weight * 3)} new cans without mining! ⚡`;
    } else if (selectedType === 'paper' && weight >= 5) {
      return `Wonderful! You've saved enough paper to protect ${Math.floor(weight / 5)} tree branches! 🌳`;
    } else if (selectedType === 'ewaste' && weight >= 0.5) {
      return `Excellent! You've prevented toxic materials from harming ${Math.floor(weight * 20)} square meters of soil! 🌱`;
    }
    return `Every kilogram you collect makes our planet healthier for children everywhere! 🌍`;
  };

  const handleSubmit = async () => {
    if (!selectedType || weight === 0) return;

    setIsSubmitting(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setStep(1);
      setSelectedType('');
      setWeight(0);
      setSubmitted(false);
    }, 3000);
  };

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2 && weight > 0) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] pb-20">
        <div className="text-center max-w-sm mx-auto">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Well Done! 🎉</h2>
          <p className="text-gray-600 mb-4">You earned <span className="font-bold text-green-600">{totalPoints} eco-points</span>!</p>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white">
            <p className="text-sm">{getImpactMessage()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      {/* Progress bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
          <span className="text-sm text-gray-400">{Math.round((step / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {step === 1 && (
          <WasteTypeSelector
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        )}

        {step === 2 && (
          <WeightInput
            weight={weight}
            onWeightChange={setWeight}
            wasteType={selectedType}
          />
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Log!</h3>
              <p className="text-gray-600">Review your recycling entry</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Waste Type:</span>
                <span className="font-medium text-gray-900 flex items-center space-x-1">
                  <span>{selectedWasteType?.icon}</span>
                  <span>{selectedWasteType?.name}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium text-gray-900">{weight}kg</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span className="font-semibold text-gray-900">Eco-points:</span>
                <span className="text-2xl font-bold text-green-600">+{totalPoints}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white">
              <p className="text-sm font-medium mb-2">🌍 Environmental Impact:</p>
              <p className="text-sm">{getImpactMessage()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex space-x-3">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
        )}
        
        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !selectedType) ||
              (step === 2 && weight === 0)
            }
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Logging...' : 'Log Recyclables'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WasteLogging;