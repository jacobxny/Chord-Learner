
import React, { useState, useEffect } from 'react';
import { Search, Waves } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchScales, ScaleData } from '../data/scales';

interface ScaleSearchProps {
  onScaleSelect: (scale: ScaleData) => void;
  selectedInstrument: string;
}

const ScaleSearch: React.FC<ScaleSearchProps> = ({ onScaleSelect, selectedInstrument }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ScaleData[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchResults = searchScales(query, selectedInstrument);
    setResults(searchResults.slice(0, 8)); // Limit to 8 results
    setShowResults(query.length > 0);
  }, [query, selectedInstrument]);

  const handleScaleClick = (scale: ScaleData) => {
    onScaleSelect(scale);
    setQuery(scale.name);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
        <Input
          type="text"
          placeholder={`Search for ${selectedInstrument} scales (e.g., pentatonic, major, blues)...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border-2 border-green-300 focus:border-green-500 focus:ring-green-500 rounded-lg text-lg"
        />
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-green-200 rounded-lg shadow-lg mt-1 z-50 max-h-64 overflow-y-auto">
          {results.map((scale, index) => (
            <button
              key={index}
              onClick={() => handleScaleClick(scale)}
              className="w-full px-4 py-3 text-left hover:bg-green-50 border-b border-green-100 last:border-b-0 flex items-center gap-3 transition-colors"
            >
              <Waves className="h-4 w-4 text-green-600" />
              <div>
                <span className="font-medium text-green-900">{scale.name}</span>
                <span className="text-sm text-green-600 ml-2 capitalize">({scale.instrument})</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {showResults && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-green-200 rounded-lg shadow-lg mt-1 z-50 p-4 text-center text-green-700">
          No {selectedInstrument} scales found for "{query}"
        </div>
      )}
    </div>
  );
};

export default ScaleSearch;
