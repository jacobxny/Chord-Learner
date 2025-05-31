import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { ChordData, instrumentStrings } from '../data/chords';
import { chordAudioPlayer } from '../utils/chordAudio';

interface ChordDiagramProps {
  chord: ChordData;
}

const ChordDiagram: React.FC<ChordDiagramProps> = ({ chord }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const strings = instrumentStrings[chord.instrument];
  const frets = [1, 2, 3, 4, 5];
  const stringWidth = chord.instrument === 'bass' ? 40 : 32;
  const diagramWidth = 20 + (strings.length - 1) * stringWidth + 20;

  const handlePlayChord = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      await chordAudioPlayer.playChord(chord.name);
    } catch (error) {
      console.error('Error playing chord:', error);
    } finally {
      setTimeout(() => setIsPlaying(false), 2000); // Reset after 2 seconds
    }
  };

  // Piano keyboard rendering
  if (chord.instrument === 'piano') {
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
    const keyWidth = 40;
    const whiteKeyHeight = 120;
    const blackKeyHeight = 80;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-900 mb-1 text-center">{chord.name}</h3>
            <p className="text-sm text-amber-700 text-center capitalize">{chord.instrument}</p>
          </div>
          <button
            onClick={handlePlayChord}
            disabled={isPlaying}
            className={`ml-4 p-2 rounded-full transition-colors ${
              isPlaying 
                ? 'bg-amber-300 text-amber-600 cursor-not-allowed' 
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
            title="Play chord sound"
          >
            <Play className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        
        <div className="relative mx-auto" style={{ width: whiteKeys.length * keyWidth }}>
          <svg width={whiteKeys.length * keyWidth} height={whiteKeyHeight + 20} className="mx-auto">
            {/* White keys */}
            {whiteKeys.map((key, index) => {
              const isPressed = chord.keys?.includes(key);
              return (
                <rect
                  key={key}
                  x={index * keyWidth}
                  y="0"
                  width={keyWidth - 2}
                  height={whiteKeyHeight}
                  fill={isPressed ? "#FCD34D" : "#FFFFFF"}
                  stroke="#374151"
                  strokeWidth="2"
                  rx="4"
                />
              );
            })}
            
            {/* Black keys */}
            {blackKeys.map((key, index) => {
              const blackKeyPositions = [0.7, 1.7, 3.7, 4.7, 5.7];
              const isPressed = chord.keys?.includes(key);
              if (index < blackKeyPositions.length) {
                return (
                  <rect
                    key={key}
                    x={blackKeyPositions[index] * keyWidth - 12}
                    y="0"
                    width="24"
                    height={blackKeyHeight}
                    fill={isPressed ? "#F59E0B" : "#1F2937"}
                    stroke="#374151"
                    strokeWidth="1"
                    rx="2"
                  />
                );
              }
              return null;
            })}
            
            {/* Key labels */}
            {whiteKeys.map((key, index) => (
              <text
                key={`label-${key}`}
                x={index * keyWidth + keyWidth / 2}
                y={whiteKeyHeight + 15}
                textAnchor="middle"
                fill="#374151"
                fontSize="12"
                fontWeight="bold"
              >
                {key}
              </text>
            ))}
          </svg>
          
          {/* Chord notes display */}
          <div className="mt-4 text-center">
            <p className="text-sm text-amber-700 mb-2">Notes:</p>
            <div className="flex justify-center gap-2">
              {chord.keys?.map((key, index) => (
                <span key={index} className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // String instrument rendering (guitar, bass, ukulele)
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-amber-900 mb-1 text-center">{chord.name}</h3>
          <p className="text-sm text-amber-700 text-center capitalize">{chord.instrument}</p>
        </div>
        <button
          onClick={handlePlayChord}
          disabled={isPlaying}
          className={`ml-4 p-2 rounded-full transition-colors ${
            isPlaying 
              ? 'bg-amber-300 text-amber-600 cursor-not-allowed' 
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
          title="Play chord sound"
        >
          <Play className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      </div>
      
      <div className="relative">
        <svg width={diagramWidth} height="250" viewBox={`0 0 ${diagramWidth} 250`} className="mx-auto">
          {/* Fret lines */}
          {frets.map((fret, index) => (
            <line
              key={fret}
              x1="20"
              y1={50 + index * 40}
              x2={diagramWidth - 20}
              y2={50 + index * 40}
              stroke="#8B4513"
              strokeWidth="2"
            />
          ))}
          
          {/* Nut (if showing first fret) */}
          {chord.baseFret === 1 && (
            <line
              x1="20"
              y1="10"
              x2={diagramWidth - 20}
              y2="10"
              stroke="#4A4A4A"
              strokeWidth="4"
            />
          )}
          
          {/* Strings */}
          {strings.map((_, stringIndex) => (
            <line
              key={stringIndex}
              x1={20 + stringIndex * stringWidth}
              y1="10"
              x2={20 + stringIndex * stringWidth}
              y2="210"
              stroke="#FFD700"
              strokeWidth="2"
            />
          ))}
          
          {/* Finger positions */}
          {chord.positions.map((position, stringIndex) => {
            if (position === -1) {
              return (
                <g key={stringIndex}>
                  <line
                    x1={20 + stringIndex * stringWidth - 8}
                    y1={-10}
                    x2={20 + stringIndex * stringWidth + 8}
                    y2={6}
                    stroke="#DC2626"
                    strokeWidth="3"
                  />
                  <line
                    x1={20 + stringIndex * stringWidth + 8}
                    y1={-10}
                    x2={20 + stringIndex * stringWidth - 8}
                    y2={6}
                    stroke="#DC2626"
                    strokeWidth="3"
                  />
                </g>
              );
            } else if (position === 0) {
              return (
                <circle
                  key={stringIndex}
                  cx={20 + stringIndex * stringWidth}
                  cy={-2}
                  r="8"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                />
              );
            } else {
              const fretY = 30 + (position - chord.baseFret) * 40;
              const fingerNumber = chord.fingers[stringIndex];
              
              return (
                <g key={stringIndex}>
                  <circle
                    cx={20 + stringIndex * stringWidth}
                    cy={fretY}
                    r="12"
                    fill="#1F2937"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  {fingerNumber > 0 && (
                    <text
                      x={20 + stringIndex * stringWidth}
                      y={fretY + 4}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {fingerNumber}
                    </text>
                  )}
                </g>
              );
            }
          })}
          
          {/* Fret numbers */}
          {frets.map((fret, index) => (
            <text
              key={fret}
              x="5"
              y={55 + index * 40}
              textAnchor="middle"
              fill="#8B4513"
              fontSize="12"
              fontWeight="bold"
            >
              {chord.baseFret + index}
            </text>
          ))}
        </svg>
        
        {/* String names */}
        <div className="flex justify-center mt-2" style={{ gap: `${stringWidth - 12}px` }}>
          {strings.map((string, index) => (
            <span key={index} className="text-sm font-semibold text-amber-800">
              {string}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChordDiagram;
