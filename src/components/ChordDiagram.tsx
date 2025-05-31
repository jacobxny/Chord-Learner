
import React from 'react';
import { ChordData, instrumentStrings } from '../data/chords';

interface ChordDiagramProps {
  chord: ChordData;
}

const ChordDiagram: React.FC<ChordDiagramProps> = ({ chord }) => {
  const strings = instrumentStrings[chord.instrument];
  const frets = [1, 2, 3, 4, 5];
  const stringWidth = chord.instrument === 'bass' ? 40 : 32;
  const diagramWidth = 20 + (strings.length - 1) * stringWidth + 20;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200">
      <h3 className="text-xl font-bold text-amber-900 mb-2 text-center">{chord.name}</h3>
      <p className="text-sm text-amber-700 mb-4 text-center capitalize">{chord.instrument}</p>
      
      <div className="relative">
        {/* Guitar/Bass/Ukulele neck */}
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
              // Muted string (X)
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
              // Open string (O)
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
              // Fretted note
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
