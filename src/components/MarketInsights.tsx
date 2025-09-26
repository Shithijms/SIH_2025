import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Calendar, DollarSign, BarChart3 } from 'lucide-react';

interface MarketInsightsProps {
  onBack: () => void;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ onBack }) => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const marketData = [
    {
      breed: 'Holstein Friesian',
      currentPrice: '₹65,000',
      change: '+8.5%',
      trend: 'up',
      demand: 'High',
      states: ['Punjab', 'Haryana', 'Uttar Pradesh']
    },
    {
      breed: 'Jersey',
      currentPrice: '₹45,000',
      change: '+5.2%',
      trend: 'up',
      demand: 'High',
      states: ['Kerala', 'Tamil Nadu', 'Karnataka']
    },
    {
      breed: 'Murrah Buffalo',
      currentPrice: '₹80,000',
      change: '+12.1%',
      trend: 'up',
      demand: 'Very High',
      states: ['Haryana', 'Punjab', 'Uttar Pradesh']
    },
    {
      breed: 'Gir',
      currentPrice: '₹32,000',
      change: '-2.3%',
      trend: 'down',
      demand: 'Medium',
      states: ['Gujarat', 'Rajasthan', 'Maharashtra']
    },
    {
      breed: 'Sahiwal',
      currentPrice: '₹40,000',
      change: '+3.8%',
      trend: 'up',
      demand: 'Medium',
      states: ['Punjab', 'Haryana', 'Rajasthan']
    }
  ];

  const priceHistory = [
    { month: 'Jan', holstein: 58000, jersey: 42000, murrah: 70000 },
    { month: 'Feb', holstein: 59500, jersey: 43000, murrah: 72000 },
    { month: 'Mar', holstein: 61000, jersey: 43500, murrah: 74000 },
    { month: 'Apr', holstein: 62500, jersey: 44000, murrah: 76000 },
    { month: 'May', holstein: 63000, jersey: 44500, murrah: 78000 },
    { month: 'Jun', holstein: 65000, jersey: 45000, murrah: 80000 }
  ];

  const states = ['All States', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Gujarat', 'Maharashtra', 'Kerala'];

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'very high': return 'text-green-800 bg-green-200';
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
            <p className="text-gray-600 mt-1">Real-time pricing and demand analysis for livestock breeds</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {states.map(state => (
                  <option key={state} value={state.toLowerCase().replace(' ', '-')}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-600 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Market Trend</p>
                <p className="text-xl font-bold text-green-600">Bullish</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Overall market showing positive growth</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-xl font-bold text-blue-600">₹54,000</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Average across all breeds</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-xl font-bold text-purple-600">2,847</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Across all regions</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Performer</p>
                <p className="text-lg font-bold text-yellow-600">Murrah</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">+12.1% this month</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Market Prices */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              Current Market Prices
            </h2>
            <div className="space-y-4">
              {marketData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {item.breed.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.breed}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(item.demand)}`}>
                          {item.demand}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.states.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{item.currentPrice}</div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Trends Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              6-Month Trends
            </h2>
            <div className="space-y-4">
              {priceHistory.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 flex-1">Holstein</span>
                      <span className="text-sm font-medium">₹{data.holstein.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 flex-1">Jersey</span>
                      <span className="text-sm font-medium">₹{data.jersey.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 flex-1">Murrah</span>
                      <span className="text-sm font-medium">₹{data.murrah.toLocaleString()}</span>
                    </div>
                  </div>
                  {index < priceHistory.length - 1 && <hr className="my-3 border-gray-200" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Analysis */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            Regional Price Analysis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Punjab', 'Haryana', 'Gujarat', 'Maharashtra', 'Kerala', 'Tamil Nadu'].map((state, index) => (
              <div key={state} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">{state}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Price:</span>
                    <span className="font-medium">₹{(45000 + index * 5000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Market Activity:</span>
                    <span className={`font-medium ${index % 2 === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                      {index % 2 === 0 ? 'High' : 'Medium'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price Change:</span>
                    <span className={`font-medium ${index % 3 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {index % 3 === 0 ? `+${2 + index}%` : `-${1 + index % 2}%`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;