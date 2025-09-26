import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, Download, Share2, Eye, Trash2 } from 'lucide-react';

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

interface ClassificationHistoryProps {
  history: AnalysisResult[];
  onBack: () => void;
}

const ClassificationHistory: React.FC<ClassificationHistoryProps> = ({ history, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredHistory = history
    .filter(item => 
      item.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marketDemand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'confidence':
          return b.confidence - a.confidence;
        case 'breed':
          return a.breed.localeCompare(b.breed);
        default:
          return 0;
      }
    });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportHistory = () => {
    const csvContent = [
      ['Date', 'Breed', 'Confidence', 'Market Demand', 'Price Range', 'Health Score'].join(','),
      ...filteredHistory.map(item => [
        item.timestamp.toLocaleDateString(),
        item.breed,
        item.confidence + '%',
        item.marketDemand,
        item.priceRange,
        item.healthScore
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'classification-history.csv';
    a.click();
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Classification History</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't classified any images yet. Start by uploading an image to see your classification history here.
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Classifying
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Classification History</h1>
            <p className="text-gray-600 mt-1">{history.length} classification{history.length !== 1 ? 's' : ''} found</p>
          </div>
          <button
            onClick={exportHistory}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Search and Sort */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by breed or demand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="confidence">Sort by Confidence</option>
              <option value="breed">Sort by Breed</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {filteredHistory.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.breed}
                      className="w-full h-32 lg:h-40 object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{item.breed}</h3>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4" />
                          {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                          {item.confidence}% confidence
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Market Demand</span>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getDemandColor(item.marketDemand)}`}>
                          {item.marketDemand}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Price Range</span>
                        <p className="font-semibold text-gray-900">{item.priceRange}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Health Score</span>
                        <p className="font-semibold text-gray-900">{item.healthScore}/100</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 mb-2 block">Key Characteristics</span>
                      <div className="flex flex-wrap gap-2">
                        {item.characteristics.slice(0, 4).map((char, charIndex) => (
                          <span key={charIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {char}
                          </span>
                        ))}
                        {item.characteristics.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{item.characteristics.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                      <button className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center gap-1">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassificationHistory;