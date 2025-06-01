
import React, { useState } from 'react';
import { Guitar, Music2, BookOpen, Waves } from 'lucide-react';
import ChordSearch from '../components/ChordSearch';
import ChordDiagram from '../components/ChordDiagram';
import ScaleSearch from '../components/ScaleSearch';
import ScaleDiagram from '../components/ScaleDiagram';
import InstrumentSelector from '../components/InstrumentSelector';
import { ChordData, chordDatabase, Instrument } from '../data/chords';
import { ScaleData, scaleDatabase } from '../data/scales';

const Index = () => {
  const [selectedChord, setSelectedChord] = useState<ChordData | null>(null);
  const [selectedScale, setSelectedScale] = useState<ScaleData | null>(null);
  const [showPopularChords, setShowPopularChords] = useState(true);
  const [showPopularScales, setShowPopularScales] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>('guitar');
  const [activeTab, setActiveTab] = useState<'chords' | 'scales'>('chords');

  const getPopularChords = (instrument: Instrument) => {
    const chordKeys = ['C', 'G', 'Am', 'F', 'Em', 'Dm'];
    return chordKeys
      .map(key => chordDatabase[key]?.find(chord => chord.instrument === instrument))
      .filter(Boolean) as ChordData[];
  };

  const getPopularScales = (instrument: Instrument) => {
    const scaleKeys = ['C-major', 'A-minor', 'G-pentatonic-major', 'A-pentatonic-minor', 'A-blues'];
    return scaleKeys
      .map(key => scaleDatabase[key]?.find(scale => scale.instrument === instrument))
      .filter(Boolean) as ScaleData[];
  };

  const handleChordSelect = (chord: ChordData) => {
    setSelectedChord(chord);
    setSelectedScale(null);
    setShowPopularChords(false);
    setShowPopularScales(false);
    setActiveTab('chords');
  };

  const handleScaleSelect = (scale: ScaleData) => {
    setSelectedScale(scale);
    setSelectedChord(null);
    setShowPopularChords(false);
    setShowPopularScales(false);
    setActiveTab('scales');
  };

  const handleInstrumentChange = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setSelectedChord(null);
    setSelectedScale(null);
    setShowPopularChords(activeTab === 'chords');
    setShowPopularScales(activeTab === 'scales');
  };

  const handleTabChange = (tab: 'chords' | 'scales') => {
    setActiveTab(tab);
    setSelectedChord(null);
    setSelectedScale(null);
    setShowPopularChords(tab === 'chords');
    setShowPopularScales(tab === 'scales');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Guitar className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Music Reference Library</h1>
          </div>
          <p className="text-center text-amber-100 text-lg max-w-2xl mx-auto">
            Learn chords and scales for guitar, bass, ukulele, and piano with interactive diagrams and audio playback.
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

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => handleTabChange('chords')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'chords'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-amber-700 border-2 border-amber-300 hover:bg-amber-50'
            }`}
          >
            <Music2 className="h-5 w-5" />
            Chords
          </button>
          <button
            onClick={() => handleTabChange('scales')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'scales'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-700 border-2 border-green-300 hover:bg-green-50'
            }`}
          >
            <Waves className="h-5 w-5" />
            Scales
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            {activeTab === 'chords' ? (
              <>
                <Music2 className="h-6 w-6 text-amber-600" />
                <h2 className="text-2xl font-semibold text-amber-900">Find Your Chord</h2>
              </>
            ) : (
              <>
                <Waves className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-green-900">Find Your Scale</h2>
              </>
            )}
          </div>
          {activeTab === 'chords' ? (
            <ChordSearch 
              onChordSelect={handleChordSelect} 
              selectedInstrument={selectedInstrument}
            />
          ) : (
            <ScaleSearch 
              onScaleSelect={handleScaleSelect} 
              selectedInstrument={selectedInstrument}
            />
          )}
        </div>

        {/* Selected Item Display */}
        {selectedChord && (
          <div className="mb-12 flex justify-center">
            <ChordDiagram chord={selectedChord} />
          </div>
        )}

        {selectedScale && (
          <div className="mb-12 flex justify-center">
            <ScaleDiagram scale={selectedScale} />
          </div>
        )}

        {/* Popular Items Section */}
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

        {showPopularScales && (
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <BookOpen className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-green-900">
                Popular {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} Scales
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {getPopularScales(selectedInstrument).map((scale, index) => (
                <div
                  key={index}
                  onClick={() => handleScaleSelect(scale)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                >
                  <ScaleDiagram scale={scale} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Popular Items */}
        {!showPopularChords && !showPopularScales && (
          <div className="text-center">
            <button
              onClick={() => {
                if (activeTab === 'chords') {
                  setShowPopularChords(true);
                  setSelectedChord(null);
                } else {
                  setShowPopularScales(true);
                  setSelectedScale(null);
                }
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'chords'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Browse Popular {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} {activeTab === 'chords' ? 'Chords' : 'Scales'}
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">How to Read Diagrams</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-8 h-8 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">1</div>
              <p className="text-sm text-amber-800">Numbers show which finger to use (chords)</p>
            </div>
            <div>
              <div className="w-8 h-8 border-2 border-green-600 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-amber-800">Open circles = open strings</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-amber-800">Green dots = scale positions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
