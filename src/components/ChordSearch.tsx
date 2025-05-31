
import React, { useState, useEffect } from 'react';
import { Search, Music } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchChords, ChordData, Instrument } from '../data/chords';

interface ChordSearchProps {
  onChordSelect: (chord: ChordData) => void;
  selectedInstrument: Instrument;
}

const ChordSearch: React.FC<ChordSearchProps> = ({ onChordSelect, selectedInstrument }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChordData[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchResults = searchChords(query, selectedInstrument);
    setResults(searchResults.slice(0, 8)); // Limit to 8 results
    setShowResults(query.length > 0);
  }, [query, selectedInstrument]);

  const handleChordClick = (chord: ChordData) => {
    onChordSelect(chord);
    setQuery(chord.name);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
        <Input
          type="text"
          placeholder={`Search for ${selectedInstrument} chords (e.g., Em, C major, A7)...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border-2 border-amber-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg text-lg"
        />
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-amber-200 rounded-lg shadow-lg mt-1 z-50 max-h-64 overflow-y-auto">
          {results.map((chord, index) => (
            <button
              key={index}
              onClick={() => handleChordClick(chord)}
              className="w-full px-4 py-3 text-left hover:bg-amber-50 border-b border-amber-100 last:border-b-0 flex items-center gap-3 transition-colors"
            >
              <Music className="h-4 w-4 text-amber-600" />
              <div>
                <span className="font-medium text-amber-900">{chord.name}</span>
                <span className="text-sm text-amber-600 ml-2 capitalize">({chord.instrument})</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {showResults && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-amber-200 rounded-lg shadow-lg mt-1 z-50 p-4 text-center text-amber-700">
          No {selectedInstrument} chords found for "{query}"
        </div>
      )}
    </div>
  );
};

export default ChordSearch;
