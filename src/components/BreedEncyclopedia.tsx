import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, TrendingUp, Award } from 'lucide-react';

interface BreedEncyclopediaProps {
  onBack: () => void;
}

const BreedEncyclopedia: React.FC<BreedEncyclopediaProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const breeds = [
    {
      id: 1,
      name: 'Holstein Friesian',
      category: 'Dairy Cattle',
      origin: 'Netherlands',
      image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
      description: 'Large dairy breed known for high milk production and distinctive black and white markings.',
      characteristics: ['High milk yield', 'Large frame', 'Black and white pattern', 'Good fertility'],
      weight: '600-700 kg',
      milkYield: '25-30L/day',
      marketDemand: 'High',
      priceRange: '₹45,000-75,000'
    },
    {
      id: 2,
      name: 'Jersey',
      category: 'Dairy Cattle',
      origin: 'Jersey Island',
      image: 'https://th.bing.com/th/id/OIP.WPjp-vIdwK2nbLuKs3l_oAHaE8?w=288&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      description: 'Small to medium-sized dairy breed known for rich milk with high butterfat content.',
      characteristics: ['High butterfat content', 'Heat tolerance', 'Efficient feed conversion', 'Docile nature'],
      weight: '350-400 kg',
      milkYield: '15-20L/day',
      marketDemand: 'High',
      priceRange: '₹35,000-55,000'
    },
    {
      id: 3,
      name: 'Gir',
      category: 'Indigenous Cattle',
      origin: 'Gujarat, India',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
      description: 'Indigenous Indian breed known for disease resistance and adaptation to tropical climate.',
      characteristics: ['Heat tolerance', 'Disease resistance', 'Distinctive hump', 'Long ears'],
      weight: '300-400 kg',
      milkYield: '8-12L/day',
      marketDemand: 'Medium',
      priceRange: '₹25,000-40,000'
    },
    {
      id: 4,
      name: 'Murrah Buffalo',
      category: 'Buffalo',
      origin: 'Haryana, India',
      image: 'https://images.pexels.com/photos/1108098/pexels-photo-1108098.jpeg',
      description: 'Premier dairy buffalo breed with excellent milk production and quality.',
      characteristics: ['High milk yield', 'Rich milk quality', 'Heat tolerance', 'Strong build'],
      weight: '500-800 kg',
      milkYield: '12-18L/day',
      marketDemand: 'High',
      priceRange: '₹60,000-1,00,000'
    },
    {
      id: 5,
      name: 'Sahiwal',
      category: 'Indigenous Cattle',
      origin: 'Pakistan/Punjab',
      image: 'https://images.pexels.com/photos/1108100/pexels-photo-1108100.jpeg',
      description: 'Hardy indigenous breed with good milk production and heat tolerance.',
      characteristics: ['Heat tolerance', 'Good milk production', 'Hardy nature', 'Disease resistance'],
      weight: '300-500 kg',
      milkYield: '10-15L/day',
      marketDemand: 'Medium',
      priceRange: '₹30,000-50,000'
    },
    {
      id: 6,
      name: 'Red Sindhi',
      category: 'Indigenous Cattle',
      origin: 'Sindh Province',
      image: 'https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg',
      description: 'Dual-purpose breed known for both milk production and drought tolerance.',
      characteristics: ['Drought tolerance', 'Dual purpose', 'Red color', 'Medium size'],
      weight: '250-400 kg',
      milkYield: '6-10L/day',
      marketDemand: 'Medium',
      priceRange: '₹20,000-35,000'
    }
  ];

  const categories = ['all', 'Dairy Cattle', 'Indigenous Cattle', 'Buffalo'];

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || breed.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getMarketDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900">Breed Encyclopedia</h1>
            <p className="text-gray-600 mt-1">Comprehensive database of cattle and buffalo breeds</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search breeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Breeds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed) => (
            <div key={breed.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={breed.image}
                alt={breed.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{breed.name}</h3>
                    <p className="text-sm text-gray-600">{breed.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {breed.origin}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{breed.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Weight</span>
                    <span className="text-sm font-medium">{breed.weight}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Milk Yield</span>
                    <span className="text-sm font-medium">{breed.milkYield}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Demand</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMarketDemandColor(breed.marketDemand)}`}>
                      {breed.marketDemand}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price Range</span>
                    <span className="text-sm font-medium text-green-600">{breed.priceRange}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Characteristics</h4>
                  <div className="flex flex-wrap gap-1">
                    {breed.characteristics.slice(0, 3).map((char, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {char}
                      </span>
                    ))}
                    {breed.characteristics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{breed.characteristics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Market Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-gray-600">Premium Breed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBreeds.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No breeds found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedEncyclopedia;