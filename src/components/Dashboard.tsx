import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Award, Calendar, BarChart3, PieChart } from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const stats = [
    { label: 'Total Classifications', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Active Users', value: '342', change: '+8%', trend: 'up' },
    { label: 'Accuracy Rate', value: '94.2%', change: '+2.1%', trend: 'up' },
    { label: 'This Month', value: '186', change: '-3%', trend: 'down' },
  ];

  const popularBreeds = [
    { breed: 'Holstein Friesian', count: 234, percentage: 32 },
    { breed: 'Jersey', count: 187, percentage: 26 },
    { breed: 'Gir', count: 143, percentage: 20 },
    { breed: 'Sahiwal', count: 98, percentage: 13 },
    { breed: 'Red Sindhi', count: 67, percentage: 9 },
  ];

  const recentActivity = [
    { time: '2 hours ago', action: 'Holstein Friesian classified', confidence: '96.2%' },
    { time: '4 hours ago', action: 'Jersey breed identified', confidence: '91.8%' },
    { time: '6 hours ago', action: 'Gir cattle analyzed', confidence: '94.5%' },
    { time: '1 day ago', action: 'Buffalo breed classified', confidence: '89.3%' },
    { time: '1 day ago', action: 'Sahiwal identified', confidence: '93.1%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium mb-2"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of classification performance and trends</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Popular Breeds */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Most Classified Breeds</h2>
            </div>
            <div className="space-y-4">
              {popularBreeds.map((breed, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{breed.breed}</h3>
                      <p className="text-sm text-gray-600">{breed.count} classifications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${breed.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-10">{breed.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-3">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600">{activity.time}</p>
                    <span className="text-sm font-medium text-green-600">{activity.confidence}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm py-2">
              View All Activity →
            </button>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Classification Trends</h2>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 78, 82, 71, 89, 94, 87, 92, 88, 96, 91, 94].map((height, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-gradient-to-t from-blue-500 to-green-500 w-full rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-green-600"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">
                  {new Date(2024, index).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;