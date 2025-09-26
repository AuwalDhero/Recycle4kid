import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface QuizCardProps {
  question: Question;
  onComplete: (correct: boolean, points: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || hasAnswered) return;
    
    setShowResult(true);
    setHasAnswered(true);
    
    const isCorrect = selectedAnswer === question.correct;
    setTimeout(() => {
      onComplete(isCorrect, isCorrect ? question.points : 0);
    }, 2000);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setHasAnswered(false);
  };

  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
            Quiz Time! 🧠
          </span>
          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
            {question.points} points
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
          
          if (!showResult) {
            buttonClass += selectedAnswer === index
              ? "border-green-500 bg-green-50 text-green-700"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
          } else {
            if (index === question.correct) {
              buttonClass += "border-green-500 bg-green-100 text-green-800";
            } else if (selectedAnswer === index && index !== question.correct) {
              buttonClass += "border-red-500 bg-red-100 text-red-800";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-600 opacity-60";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && index === question.correct && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && selectedAnswer === index && index !== question.correct && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`rounded-lg p-4 mb-4 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${
              isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {isCorrect ? 'Correct! Well done! 🎉' : 'Not quite right 😅'}
            </span>
          </div>
          <p className={`text-sm ${
            isCorrect ? 'text-green-700' : 'text-red-700'
          }`}>
            {question.explanation}
          </p>
        </div>
      )}

      <div className="flex space-x-3">
        {!showResult ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={resetQuiz}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;