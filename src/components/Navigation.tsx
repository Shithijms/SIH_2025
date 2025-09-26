import React from 'react';
import { Home, Camera, BarChart3, BookOpen, History, TrendingUp } from 'lucide-react';

type Screen = 'home' | 'upload' | 'analysis' | 'results' | 'dashboard' | 'encyclopedia' | 'market' | 'history';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'upload' as Screen, icon: Camera, label: 'Classify' },
    { id: 'dashboard' as Screen, icon: BarChart3, label: 'Dashboard' },
    { id: 'encyclopedia' as Screen, icon: BookOpen, label: 'Breeds' },
    { id: 'market' as Screen, icon: TrendingUp, label: 'Market' },
    { id: 'history' as Screen, icon: History, label: 'History' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Breed Classifier</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <select
              value={currentScreen}
              onChange={(e) => onNavigate(e.target.value as Screen)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;