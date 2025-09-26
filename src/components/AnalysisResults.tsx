import React from 'react';
import { ArrowLeft, Share2, Download, TrendingUp, Heart, MapPin, Calendar, Camera, Award, AlertTriangle } from 'lucide-react';

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

interface AnalysisResultsProps {
  result: AnalysisResult;
  onBack: () => void;
  onNewClassification: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onBack, onNewClassification }) => {
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMarketDemandColor = (demand: string) => {
    const demandLower = demand.toLowerCase();
    if (demandLower.includes('high')) return 'text-green-600 bg-green-100';
    if (demandLower.includes('medium')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Breed Classification: ${result.breed}`,
        text: `Identified as ${result.breed} with ${result.confidence}% confidence`,
      });
    }
  };

  const handleDownload = () => {
    const reportData = {
      breed: result.breed,
      confidence: result.confidence,
      timestamp: result.timestamp,
      characteristics: result.characteristics,
      marketInfo: {
        demand: result.marketDemand,
        priceRange: result.priceRange
      },
      healthScore: result.healthScore,
      recommendations: result.recommendations
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breed-analysis-${result.breed.replace(' ', '-')}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src={result.image}
                alt="Analyzed animal"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{result.breed}</h2>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">
                      {result.confidence}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Health Score</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(result.healthScore)}`}>
                    {result.healthScore}/100
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Market Demand</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMarketDemandColor(result.marketDemand)}`}>
                    {result.marketDemand}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price Range</span>
                  <span className="font-semibold text-gray-900">{result.priceRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Characteristics */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                Breed Characteristics
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.characteristics.map((char, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Market Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Current Demand</span>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getMarketDemandColor(result.marketDemand)}`}>
                    {result.marketDemand}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Price Range</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{result.priceRange}</div>
                </div>
              </div>
            </div>

            {/* Health Assessment */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-red-600" />
                Health Assessment
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Overall Health Score</span>
                    <span className="font-semibold">{result.healthScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        result.healthScore >= 80 ? 'bg-green-500' :
                        result.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${result.healthScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {result.healthScore < 70 && (
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-medium">Health Advisory</p>
                    <p className="text-yellow-700 text-sm">Consider consulting with a veterinarian for a comprehensive health evaluation.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-purple-600" />
                Recommendations
              </h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onNewClassification}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Analyze Another Image
              </button>
              
              <button
                onClick={handleDownload}
                className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;