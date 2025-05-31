
import React, { useState } from 'react';
import { Guitar, Music2, BookOpen } from 'lucide-react';
import ChordSearch from '../components/ChordSearch';
import ChordDiagram from '../components/ChordDiagram';
import InstrumentSelector from '../components/InstrumentSelector';
import { ChordData, chordDatabase, Instrument } from '../data/chords';

const Index = () => {
  const [selectedChord, setSelectedChord] = useState<ChordData | null>(null);
  const [showPopularChords, setShowPopularChords] = useState(true);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>('guitar');

  const getPopularChords = (instrument: Instrument) => {
    const chordKeys = ['C', 'G', 'Am', 'F', 'Em', 'Dm'];
    return chordKeys
      .map(key => chordDatabase[key]?.find(chord => chord.instrument === instrument))
      .filter(Boolean) as ChordData[];
  };

  const handleChordSelect = (chord: ChordData) => {
    setSelectedChord(chord);
    setShowPopularChords(false);
  };

  const handleInstrumentChange = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setSelectedChord(null);
    setShowPopularChords(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Guitar className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Music Chord Library</h1>
          </div>
          <p className="text-center text-amber-100 text-lg max-w-2xl mx-auto">
            Learn guitar, bass, and ukulele chords with interactive diagrams. Search for any chord and see exactly where to place your fingers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Instrument Selector */}
        <InstrumentSelector 
          selectedInstrument={selectedInstrument}
          onInstrumentChange={handleInstrumentChange}
        />

        {/* Search Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Music2 className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-amber-900">Find Your Chord</h2>
          </div>
          <ChordSearch 
            onChordSelect={handleChordSelect} 
            selectedInstrument={selectedInstrument}
          />
        </div>

        {/* Selected Chord Display */}
        {selectedChord && (
          <div className="mb-12 flex justify-center">
            <ChordDiagram chord={selectedChord} />
          </div>
        )}

        {/* Popular Chords Section */}
        {showPopularChords && (
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <BookOpen className="h-6 w-6 text-amber-600" />
              <h2 className="text-2xl font-semibold text-amber-900">
                Popular {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} Chords
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {getPopularChords(selectedInstrument).map((chord, index) => (
                <div
                  key={index}
                  onClick={() => handleChordSelect(chord)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                >
                  <ChordDiagram chord={chord} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Popular Chords */}
        {!showPopularChords && (
          <div className="text-center">
            <button
              onClick={() => {
                setShowPopularChords(true);
                setSelectedChord(null);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse Popular {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} Chords
            </button>
          </div>
        )}

        {/* Chord Legend */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">How to Read Chord Diagrams</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-8 h-8 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">1</div>
              <p className="text-sm text-amber-800">Numbers show which finger to use</p>
            </div>
            <div>
              <div className="w-8 h-8 border-2 border-green-600 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-amber-800">Open circles = open strings</p>
            </div>
            <div>
              <div className="text-red-600 text-xl font-bold mb-2">×</div>
              <p className="text-sm text-amber-800">X marks = don't play that string</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
