import React, { useState } from 'react';
import { Camera, Upload, Image as ImageIcon, TrendingUp, BookOpen, History, MapPin, Users, Award, Zap } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import AnalysisResults from './components/AnalysisResults';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import BreedEncyclopedia from './components/BreedEncyclopedia';
import MarketInsights from './components/MarketInsights';
import ClassificationHistory from './components/ClassificationHistory';

type Screen = 'home' | 'upload' | 'analysis' | 'results' | 'dashboard' | 'encyclopedia' | 'market' | 'history';

interface AnalysisResult {
  breed: string;
  confidence: number;
  characteristics: string[];
  marketDemand: string;
  priceRange: string;
  healthScore: number;
  recommendations: string[];
  image: string;
  timestamp: Date;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [classificationHistory, setClassificationHistory] = useState<AnalysisResult[]>([]);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setClassificationHistory(prev => [result, ...prev]);
    setCurrentScreen('results');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
 
            
            <div className="container mx-auto px-4 py-8">
              <div className="relative w-full h-[400px]"> {/* fixed height */}
                  <img
                    src="https://th.bing.com/th/id/OIP.6K8eiwBPKmvUj7Dem8aaQgHaE7?w=262&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
            </div>

              {/* Hero Section */}
              <div className="text-center mb-12">
                {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div> */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Cattle & Buffalo Breed Identifier
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Advanced ML-powered identification system for cattle and buffalo breeds with market insights
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <button
                    onClick={() => setCurrentScreen('upload')}
                    className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3"
                  >
                    <Camera className="w-6 h-6" />
                    Start Classification
                  </button>
                  <button
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                  >
                    <TrendingUp className="w-6 h-6" />
                    View Dashboard
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <FeatureCard
                  icon={<Zap className="w-8 h-8" />}
                  title="Instant Recognition"
                  description="AI-powered breed identification in seconds"
                  color="from-yellow-500 to-orange-500"
                />
                <FeatureCard
                  icon={<TrendingUp className="w-8 h-8" />}
                  title="Market Analytics"
                  description="Real-time price trends and demand data"
                  color="from-blue-500 to-purple-500"
                />
                <FeatureCard
                  icon={<MapPin className="w-8 h-8" />}
                  title="Location-Based"
                  description="Regional market insights and pricing"
                  color="from-green-500 to-teal-500"
                />
                <FeatureCard
                  icon={<BookOpen className="w-8 h-8" />}
                  title="Breed Encyclopedia"
                  description="Comprehensive breed information database"
                  color="from-purple-500 to-pink-500"
                />
              </div>

              {/* Stats Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Platform Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <StatCard number="50+" label="Breeds Supported" />
                  <StatCard number="99.2%" label="Accuracy Rate" />
                  <StatCard number="10K+" label="Classifications" />
                  <StatCard number="500+" label="Active Farmers" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <QuickActionCard
                  icon={<ImageIcon className="w-8 h-8" />}
                  title="Classify Image"
                  description="Upload or capture an image for breed identification"
                  onClick={() => setCurrentScreen('upload')}
                />
                <QuickActionCard
                  icon={<BookOpen className="w-8 h-8" />}
                  title="Browse Breeds"
                  description="Explore our comprehensive breed encyclopedia"
                  onClick={() => setCurrentScreen('encyclopedia')}
                />
                <QuickActionCard
                  icon={<History className="w-8 h-8" />}
                  title="View History"
                  description="Check your previous classifications and results"
                  onClick={() => setClassificationHistory.length > 0 && setCurrentScreen('history')}
                />
              </div>
            </div>
          </div>
        );

      case 'upload':
        return <ImageUpload onAnalysisComplete={handleAnalysisComplete} onBack={() => setCurrentScreen('home')} />;

      case 'results':
        return analysisResult ? (
          <AnalysisResults 
            result={analysisResult} 
            onBack={() => setCurrentScreen('home')}
            onNewClassification={() => setCurrentScreen('upload')}
          />
        ) : null;

      case 'dashboard':
        return <Dashboard onBack={() => setCurrentScreen('home')} />;

      case 'encyclopedia':
        return <BreedEncyclopedia onBack={() => setCurrentScreen('home')} />;

      case 'market':
        return <MarketInsights onBack={() => setCurrentScreen('home')} />;

      case 'history':
        return <ClassificationHistory history={classificationHistory} onBack={() => setCurrentScreen('home')} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen !== 'home' && (
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
      {renderScreen()}
    </div>
  );
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${color} rounded-lg mb-4 text-white`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600 font-medium">{label}</div>
  </div>
);

const QuickActionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left group"
  >
    <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform duration-200">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </button>
);

export default App;