import React, { useState } from 'react';
import { BookOpen, Play, Award, Brain, Zap } from 'lucide-react';
import QuizCard from '../components/Learning/QuizCard';
import { useAuth } from '../contexts/AuthContext';

const LearningZone: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'quiz' | 'games' | 'videos'>('overview');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const quizQuestions = [
    {
      id: '1',
      question: 'How long does it take for a plastic bottle to decompose in nature?',
      options: ['1 year', '10 years', '50 years', '450+ years'],
      correct: 3,
      explanation: 'Plastic bottles take 450+ years to decompose, which is why recycling them is so important!',
      points: 50
    },
    {
      id: '2',
      question: 'Which material can be recycled the most times without losing quality?',
      options: ['Paper', 'Plastic', 'Aluminum', 'Glass'],
      correct: 2,
      explanation: 'Aluminum can be recycled infinitely without losing its properties, making it extremely valuable!',
      points: 50
    },
    {
      id: '3',
      question: 'What happens to the carbon footprint when we recycle paper?',
      options: ['Increases by 20%', 'Stays the same', 'Reduces by 35%', 'Reduces by 70%'],
      correct: 3,
      explanation: 'Recycling paper reduces carbon emissions by about 70% compared to making new paper from trees!',
      points: 50
    },
    {
      id: '4',
      question: 'How much energy does recycling aluminum cans save compared to making new ones?',
      options: ['25%', '50%', '75%', '95%'],
      correct: 3,
      explanation: 'Recycling aluminum cans uses 95% less energy than producing new ones from raw materials!',
      points: 50
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: 'Why Recycling Matters',
      description: 'Learn how recycling helps protect our planet and creates a better future for children.',
      icon: '🌍',
      duration: '5 min',
      completed: true
    },
    {
      id: 2,
      title: 'Types of Recyclable Materials',
      description: 'Discover different materials you can recycle and their environmental impact.',
      icon: '♻️',
      duration: '7 min',
      completed: true
    },
    {
      id: 3,
      title: 'The Recycling Process',
      description: 'Follow the journey of recyclables from collection to new products.',
      icon: '🔄',
      duration: '6 min',
      completed: false
    },
    {
      id: 4,
      title: 'Climate Change & Waste',
      description: 'Understand how waste management affects climate change and children\'s health.',
      icon: '🌡️',
      duration: '8 min',
      completed: false
    }
  ];

  const ecoGames = [
    {
      id: 1,
      title: 'Sorting Challenge',
      description: 'Sort different waste items into the correct recycling bins as fast as you can!',
      icon: '🗂️',
      difficulty: 'Easy',
      points: '10-50 pts'
    },
    {
      id: 2,
      title: 'Eco Memory Match',
      description: 'Match recyclable items with their environmental benefits.',
      icon: '🧩',
      difficulty: 'Medium',
      points: '20-80 pts'
    },
    {
      id: 3,
      title: 'Carbon Footprint Quiz',
      description: 'Test your knowledge about how different actions affect the environment.',
      icon: '👣',
      difficulty: 'Hard',
      points: '30-100 pts'
    }
  ];

  const handleQuizComplete = (correct: boolean, points: number) => {
    if (correct) {
      setQuizScore(quizScore + points);
      setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed
        setActiveSection('overview');
        setCurrentQuestionIndex(0);
      }
    }, 2000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <h2 className="text-xl font-bold">Learning Progress</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{learningModules.filter(m => m.completed).length}</p>
            <p className="text-sm opacity-90">Lessons Complete</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{quizScore}</p>
            <p className="text-sm opacity-90">Quiz Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm opacity-90">Badges Earned</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveSection('quiz')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Take Quiz</h3>
          </div>
          <p className="text-sm text-gray-600">Test your recycling knowledge and earn points!</p>
        </button>

        <button
          onClick={() => setActiveSection('games')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-100 rounded-lg p-2">
              <Play className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Play Games</h3>
          </div>
          <p className="text-sm text-gray-600">Learn through fun and interactive games!</p>
        </button>
      </div>

      {/* Learning Modules */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Modules</h3>
        <div className="space-y-3">
          {learningModules.map((module) => (
            <div
              key={module.id}
              className={`bg-white rounded-xl shadow-sm border p-4 ${
                module.completed ? 'border-green-200' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{module.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">{module.duration}</span>
                  {module.completed ? (
                    <div className="bg-green-100 rounded-full p-1">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Start
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Recycling Knowledge Quiz</h2>
        <p className="text-gray-600">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
        <div className="mt-3 bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <QuizCard
        question={quizQuestions[currentQuestionIndex]}
        onComplete={handleQuizComplete}
      />

      {quizScore > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">Current Score: <span className="font-bold text-green-600">{quizScore} points</span></p>
        </div>
      )}
    </div>
  );

  const renderGames = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Eco Games</h2>
        <p className="text-gray-600">Learn through fun and interactive games!</p>
      </div>

      <div className="space-y-4">
        {ecoGames.map((game) => (
          <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{game.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{game.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className={`px-2 py-1 rounded-full ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {game.difficulty}
                  </span>
                  <span>{game.points}</span>
                </div>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span>Play</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Learning Zone</h1>
        </div>
        <p className="text-blue-100">
          Discover how recycling helps protect our planet and creates a better future!
        </p>
      </div>

      {/* Navigation */}
      {activeSection !== 'overview' && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <button
            onClick={() => setActiveSection('overview')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Overview
          </button>
        </div>
      )}

      {/* Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'quiz' && renderQuiz()}
      {activeSection === 'games' && renderGames()}
    </div>
  );
};

export default LearningZone;